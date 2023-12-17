import { NextFunction, Request, Response } from "express";

export default function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    console.log(err);
    const status = err.status || 500;
    response.status(status).send(err.message);
}