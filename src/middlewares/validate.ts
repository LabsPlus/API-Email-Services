import { Request, Response, NextFunction, query } from "express";
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../helpers/api-erros';

export const validate = (schema: AnyZodObject) => (request: Request, response: Response, nextFunction: NextFunction) => {
    try {
        schema.parse({
            params: request.params,
            query: request.query,
            body: request.body
        });

        nextFunction();

    } catch (error) {
        
        if(error instanceof ZodError) {
            return nextFunction(new BadRequestError(error.errors.join('\n')));
        }

        nextFunction(error);
    }
};