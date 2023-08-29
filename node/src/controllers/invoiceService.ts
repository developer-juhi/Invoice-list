import { Request, Response } from 'express';
import mongoose from 'mongoose';
import response from '../helper/responseMiddleware';
import log4js from "log4js";
const logger = log4js.getLogger();
import InvoiceModel from '../models/invoice-model';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ============================================= Over Here Include Library =============================================
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// *******************************************************************************************
// =========================== Get Data With Pagination And Filter ===========================
// *******************************************************************************************

const allFiled = [
    "_id",
    "createdAt",
    "reference",
    "customer",
    "status",
    "invoice_date",
    "invoice_amount",
    "amount_due",
    "currency",
    "due_date",
    "mandate_status"
]
let project: any = {}

const getAllFiled = async () => {
    await allFiled.map(function async(item: any) {
        project[item] = 1;
    })
}

getAllFiled();

const get = (async (req: Request, res: Response) => {
    const session: any = await mongoose.startSession();
    session.startTransaction();
    try {
        const { search, per_page, page, sort_field, sort_direction, from_date, to_date, status, currency } = req.query;
        let filterText: object = {};
        let filterTextValue: any = search;
        let orders: any = {};
        let pageFind = page ? (Number(page) - 1) : 0;
        let perPage: number = per_page == undefined ? 10 : Number(per_page)

        if (sort_field) {
            orders[sort_field as string] = sort_direction == "ascend" ? 1 : -1;
        } else {
            orders = { 'createdAt': -1 };
        }

        if (filterTextValue) {
            let filterTextField: any = []
            await allFiled.map(function async(filed: any) {
                let filedData = {
                    [filed]: {
                        $regex: `${filterTextValue}`, $options: "i"
                    }
                }
                filterTextField.push(filedData);
            })

            filterText = { $or: filterTextField }
            if (mongoose.Types.ObjectId.isValid(filterTextValue)) {
                filterText = {
                    $or: [
                        { _id: new mongoose.Types.ObjectId(filterTextValue) },
                    ],
                }
            }
        }
        if (from_date && to_date) {
            filterText = {
                ...filterText,
                createdAt: {
                    $gte: new Date(from_date.toString()),
                    $lte: new Date(to_date.toString())
                }
            }
        }
        if (status) {
            filterText = {
                ...filterText,
                status: status,
            };
        }
        if (currency) {
            filterText = {
                ...filterText,
                currency: currency,
            };
        }
        const dataList: any = await InvoiceModel.aggregate([
            { $project: project },
            { $match: filterText },
            { $sort: orders },
            {
                $facet: {
                    total: [{ $count: 'createdAt' }],
                    docs: [{ $addFields: { _id: '$_id' } }],
                },
            },
            { $unwind: '$total' },
            {
                $project: {
                    docs: {
                        $slice: ['$docs', perPage * pageFind, {
                            $ifNull: [perPage, '$total.createdAt']
                        }]
                    },
                    total: '$total.createdAt',
                    limit: { $literal: perPage },
                    page: { $literal: (pageFind + 1) },
                    pages: { $ceil: { $divide: ['$total.createdAt', perPage] } },
                },
            },
        ]);
        const sendResponse: any = {
            'message': process.env.APP_GET_MESSAGE,
            'data': dataList.length > 0 ? dataList[0] : {},
        };
        await session.commitTransaction();
        session.endSession();
        return response.sendSuccess(req, res, sendResponse);
    } catch (err: any) {
        const sendResponse: any = {
            message: err.message,
        }
        logger.info("Invoice Data get");
        logger.info(err);
        await session.abortTransaction();
        session.endSession();
        return response.sendError(res, sendResponse);
    }

})


// Export default
export default {
    get,
} as const;
