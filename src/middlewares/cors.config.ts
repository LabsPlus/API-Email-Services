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
    res.header("Access-Control-Expose-Headers", "Content-Range, X-Content-Range");
    res.header("Access-Control-Max-Age", "600");
    res.header("Vary", "Origin");
    req.header("Access-Control-Allow-Origin");
    req.header("Access-Control-Allow-Credentials");
    req.header("Access-Control-Allow-Headers");
    req.header("Access-Control-Allow-Methods");
    next();
};
