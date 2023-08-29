import mongoose, { model, Schema } from "mongoose";

export interface IInvoiceModel {
    _id: mongoose.Types.ObjectId;
    reference: string;
    customer: string;
    status: string;
    invoice_date: string;
    invoice_amount: string;
    amount_due: string;
    currency: string;
    due_date: string;
    mandate_status: string;
}

const schema = new Schema<IInvoiceModel>(
    {
        reference: { type: String },
        customer: { type: String },
        status: { type: String },
        invoice_date: { type: String },
        invoice_amount: { type: String },
        amount_due: { type: String },
        currency: { type: String },
        due_date: { type: String },
        mandate_status: { type: String, default: "Yes" },
    }, {
    timestamps: true
}
);

const InvoiceModel = model('invoices', schema);

export default InvoiceModel;

// 1 = Not scheduled
// 2 = Pending submission
// 3 = Pending customer approval
// 4 = Collating...
// 5 = Paid Out
// 6 = Cancelled
// 7 = Installment n of paid
// 8 = Installment schedule cancelled
// 9 = Installment creation failed
// 10 = Failed
// 11 = Need attention
