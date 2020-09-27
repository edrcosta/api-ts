import { Response, Request } from 'express';

export class BaseController
{
    formatedResponse(req: Request, data){
        return {
            meta: {
                status: 200,
                now: new Date(),
                requestId: 123
            },
            result: data
        }
    }
}