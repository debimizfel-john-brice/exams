import { AccountOperation, IAccountOperation } from "../2-models/account_operation";
import { ValidationError } from "../2-models/client-errors";

function getOperationsByAccount(account_number: string): Promise<IAccountOperation[]> {
    return AccountOperation.find({ account_number }).exec();
}

function addOperation(operation: IAccountOperation): Promise<IAccountOperation> {
    const error = operation.validateSync();
    if (error) throw new ValidationError(error.message);
    return operation.save();
}

export default {
    getOperationsByAccount,
    addOperation
}