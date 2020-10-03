import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { AuctionsBussiness, BidBussiness } from '../bussiness';

export class BidController
{
    public async create(req: Request, res : Response){

        const bidBussiness = new BidBussiness();
        const auctionBussiness = new AuctionsBussiness()

        //check bid format
        const errors = await bidBussiness.validate(req.body);

        if(errors){
            return res.json(ResponseHelper.formatData({
                errors: errors
            }, 406)).status(406);
        }

        //prevent double
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
}