import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { BaseController } from './'
import { AuctionsBussiness, BidBussiness } from '../bussiness';

export class AuctionController extends BaseController
{
    public async start(req: Request, res : Response){

        const auctionsBussiness = new AuctionsBussiness();
        
        return res.json(ResponseHelper.formatData(
            await auctionsBussiness.update(parseInt(req.params.id), {
                status: 'ongoing'
            })
        ));
    }

    public async end(req: Request, res : Response){
        const auctionsBussiness = new AuctionsBussiness();

        return res.json(ResponseHelper.formatData(
            await auctionsBussiness.update(parseInt(req.params.id), {
                status: 'finished'
            })
        ));
    }

    public async getOne(req: Request, res : Response){
        
        const auctionsBussiness = new AuctionsBussiness();
        const auction = await auctionsBussiness.getOneById(parseInt(req.params.id));        

        if(!auction || !auction[0]) {
            return res.json(ResponseHelper.formatData(null, 404));
        }

        return res.json(ResponseHelper.formatData(auction[0]));
    }

    public async addBid(req: Request, res : Response){

        const bidBussiness = new BidBussiness();
        const errors = await bidBussiness.validate(req.body);

        if(errors){
            return res.json(ResponseHelper.formatData({
                errors: errors
            }));
        }

        return res.json(ResponseHelper.formatData(
            await bidBussiness.create(req.body)
        ));
    }

    public async create(req: Request, res : Response){

        const auctionsBussiness = new AuctionsBussiness();

        const errors = await auctionsBussiness.validate(req.body);

        if(errors){
            return res.json(ResponseHelper.formatData({
                errors: errors
            }));
        }
        
        return res.json(ResponseHelper.formatData(
            await auctionsBussiness.create(req.body)
        ));
    }
}