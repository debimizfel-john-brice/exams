import express, { NextFunction, Request, Response } from "express"
import account_service from "../5-services/account_service";
import { AccountOperation as AccountOperation } from "../2-models/account_operation";

const router = express.Router();
export default router;

router.get("/:accountNumber", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const accountNumber = request.params.accountNumber;
        const operations = await account_service.getOperationsByAccount(accountNumber);
        response.json(operations);
    } catch (error) {
        next(error)
    }
});

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const operation = new AccountOperation(request.body);
        const newOperation = await account_service.addOperation(operation);
        response.json(newOperation);
    } catch (error) {
        next(error)
    }
});
