import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { AuctionsBussiness, BidBussiness } from '../bussiness';

export class AuctionController
{
    error = ResponseHelper.formatData({ errors: ['error to finish']});
    
    public async start(req: Request, res : Response){
        const auctionBussiness = new AuctionsBussiness();
        
        const auctionId = parseInt(req.params.id);

        const verifyStatus = await auctionBussiness.countWhere({
            status: 'finished',
            id: auctionId
        });

        if(verifyStatus && verifyStatus > 0){
            return res.json({
                status: 'finished'
            })
        }

        const result = await auctionBussiness.update(auctionId, {
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

        return res.json(ResponseHelper.formatData({ 
            status: 'finished',
            winner: await bidBussiness.getWinner(auctionId)
        }));
    }

    public async getOne(req: Request, res : Response){
        
        const auctionsBussiness = new AuctionsBussiness();
        const auction = await auctionsBussiness.getOneById(parseInt(req.params.id));        

        if(!auction || !auction[0]) {
            return res.json(ResponseHelper.formatData(null, 404));
        }

        return res.json(ResponseHelper.formatData(auction[0]));
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