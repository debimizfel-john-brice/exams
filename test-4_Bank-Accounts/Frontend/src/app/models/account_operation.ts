export enum Operations {
    "withdrawal" = "withdrawal",
    "deposit" = "deposit",
    "loan" = "loan"
}

export class AccountOperation {
    _id: string;
    account_number: string;
    operation_type: Operations;
    amount: number;
    date: Date;
    interest: number;
    amount_of_payments: number;
}
