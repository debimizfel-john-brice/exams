import mongoose from "mongoose";

enum Operations {
    "withdrawal",
    "deposit",
    "loan"
}

export interface IAccountOperation extends mongoose.Document {
    account_number: string;
    operation_type: Operations;
    amount: number;
    date: Date;
    interest: number;
    amount_of_payments: number;
}

const AccountOperationSchema = new mongoose.Schema({
    account_number: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },

    operation_type: String,
    interest: Number,
    amount_of_payments: Number
}, {
    versionKey: false,
    timestamps: true
});

export const AccountOperation = mongoose.model<IAccountOperation>("AccountOperation", AccountOperationSchema, "accountOperations");