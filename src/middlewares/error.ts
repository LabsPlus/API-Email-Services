import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-erros";

export const errorMiddleware = (
    
    error: ApiError, 
    request: Request, 
    response: Response, 
    nextFunction: NextFunction
    
    ) => {
        
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : error;

        console.log(`[ERROR] ${error}`);

        return error.isOperational ? response.status(statusCode).json({ message }) : response.status(500).json({ message: 'Internal Server Error' });

    };