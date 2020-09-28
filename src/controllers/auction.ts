import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { BaseController } from './'

export class AuctionController extends BaseController
{
    public async start(req: Request, res : Response){
        res.json(ResponseHelper.formatData({
            hello: 'world'
        }))
    }

    public async create(req: Request, res : Response){
        res.json(ResponseHelper.formatData({
            hello: 'world'
        }))
    }
    
    public async end(req: Request, res : Response){
        res.json(ResponseHelper.formatData({
            hello: 'world'
        }))
    }

    public async addBid(req: Request, res : Response){
        res.json(ResponseHelper.formatData({
            hello: 'world'
        }))
    }

    public async getOne(req: Request, res : Response){
        res.json(ResponseHelper.formatData({
            hello: 'world'
        }))
    }
}