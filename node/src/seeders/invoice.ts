'use strict';
require('dotenv').config({ path: 'F:/2023/juhi_interview/node' + '/.env' })
import InvoiceModel from '../models/invoice-model';
import mongoose from 'mongoose';
const { v4: uuidv4 } = require('uuid');
const randomNameGenerator = (num: Number) => {
    let res = '';
    for (let i: number = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    };
    return res;
};

let data: any = [];
for (let i: number = 0; i < 100; i++) {
    let obj = {
        reference: uuidv4(),
        customer: randomNameGenerator(10),
        status: Math.floor((Math.random() * 10) + 1),
        invoice_date: '1/29/2023',
        due_date: "12/9/2022",
        invoice_amount: Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1),
        amount_due: Math.floor((Math.random() * 100) + 1),
        currency: Math.floor(Math.random() * 3) + 1 ,
        mandate_status: "Yes",
    }

    data.push(obj);
}

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

const seedDB = async () => {
    if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI);
        await InvoiceModel.deleteMany({});
        await InvoiceModel.create(data);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
