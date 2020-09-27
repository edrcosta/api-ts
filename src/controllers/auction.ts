import { Response, Request } from 'express';
import { BaseController } from './'

export class AuctionController extends BaseController
{
    public async start(req: Request, res : Response){
        res.json(this.formatedResponse(req, {
            hello: 'world'
        }))
    }

    public async create(req: Request, res : Response){
        res.json(this.formatedResponse(req, {
            hello: 'world'
        }))
    }
    
    public async end(req: Request, res : Response){
        res.json(this.formatedResponse(req, {
            hello: 'world'
        }))
    }

    public async addBid(req: Request, res : Response){
        res.json(this.formatedResponse(req, {
            hello: 'world'
        }))
    }

    public async getOne(req: Request, res : Response){
        res.json(this.formatedResponse(req, {
            hello: 'world'
        }))
    }
}