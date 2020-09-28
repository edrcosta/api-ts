import { ErrorRequestHandler, Request, NextFunction, Response } from 'express';
import { ConfigHelper } from '../helpers';

export class ResponseHelper
{
    //format any data into the default api response
    static formatData(data: any){
        return {
            meta: {
                status: 200,
                now: new Date(),
                requestId: 123
            },
            result: data
        }
    }

    //Setup general http headers to endpoints
    static httpHeader = (req : Request, res : Response, next : NextFunction) => {
        
        const config = ConfigHelper.get();
    
        console.log(`new HTTP request ${req.method} :: ${req.url}`);
        console.log(req.headers)
        
        res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.server.port}`);
        res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
        next();
    }

    static errorHanddler = (err : ErrorRequestHandler, req : Request, res : Response, next : NextFunction) => {
        console.log(req);
        if (err.name === 'UnauthorizedError') {
            res.status(401).send(err);
        }else {
            next(err);
        }
    }
}