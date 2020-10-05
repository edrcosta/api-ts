import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { BidBussiness } from '../bussiness';

export class BidController
{
    public async create(req: Request, res : Response){

        const bidBussiness = new BidBussiness();

        const auctionId = parseInt(req.params.auctionId);
        
        return res.json(ResponseHelper.formatData(
            await bidBussiness.addBidToAuction(auctionId, {
                email: req.body.email,
                amount: req.body.amount,
                auctions_id: auctionId
            })
        ));
    }
}