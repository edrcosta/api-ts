import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { BaseController } from './'
import { AuctionsBussiness, BidBussiness } from '../bussiness';

export class AuctionController extends BaseController
{
    error = ResponseHelper.formatData({ errors: ['error to finish']});
    
    public async start(req: Request, res : Response){
        const auctionBussiness = new AuctionsBussiness();
        
        const result = await auctionBussiness.update(parseInt(req.params.id), {
            status: 'ongoing'
        });

        if(!result) return res.json(this.error);            
    
        return res.json(ResponseHelper.formatData({ status: 'ongoing'}));
    }

    public async end(req: Request, res : Response){
        const bidBussiness = new BidBussiness();
        const auctionBussiness = new AuctionsBussiness()

        const auctionId = parseInt(req.params.id);
        
        const result = await auctionBussiness.update(auctionId, {
            status: 'finished',
            winner: await bidBussiness.getWinner(auctionId)
        });

        if(!result) return res.json(this.error);

        return res.json(ResponseHelper.formatData({ status: 'finished'}));
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
        const auctionBussiness = new AuctionsBussiness()

        //check bid format
        const errors = await bidBussiness.validate(req.body);

        if(errors){
            return res.json(ResponseHelper.formatData({
                errors: errors
            }, 406)).status(406);
        }

        //prevent double bid
        if(await bidBussiness.countWithSameValue(req.body.amount) > 0){
            return res.json(ResponseHelper.formatData({
                errors: [
                    'auction now cost more'
                ]
            }, 406)).status(406);
        }

        //check auction status
        const auctionData = await auctionBussiness.getOneById(parseInt(req.params.auctionId))

        if(typeof auctionData[0].status === 'undefined' || auctionData[0].status !== 'ongoing'){
            return res.json(ResponseHelper.formatData({
                errors: ['this action is not ongoing']
            }));
        }

        return res.json(ResponseHelper.formatData(
            await bidBussiness.create({
                email: req.body.email,
                amount: req.body.amount,
                auctions_id: req.params.auctionId
            })
        ));
    }

    public async create(req: Request, res : Response){

        const auctionsBussiness = new AuctionsBussiness();

        const errors = await auctionsBussiness.validate(req.body);

        if(errors){
            return res.json(ResponseHelper.formatData({
                errors: errors
            }, 406)).status(406);
        }
        
        return res.json(ResponseHelper.formatData(
            await auctionsBussiness.create(req.body)
        ));
    }
}