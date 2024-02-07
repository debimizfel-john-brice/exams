import { NextFunction, Request, Response } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).send(err.message);
}

export default catchAll;