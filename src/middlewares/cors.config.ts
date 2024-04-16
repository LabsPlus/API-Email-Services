import {Request, Response, NextFunction} from 'express';


export const corsConfig = (req:Request, res:Response, next:NextFunction) => {
    const allowedOrigins = [process.env.ENVIEI_WEBAPP_URL, process.env.ENVIEI_WEBAPP_URL_LOCALHOST];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin || '')) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, HEAD, PATCH");
    next();
};
