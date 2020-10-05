import { Response, Request } from 'express';
import { ResponseHelper } from '../helpers';
import { AuctionsBussiness } from '../bussiness';

export class AuctionController
{
    error = ResponseHelper.formatData({ errors: ['error to finish']});
    
    public async start(req: Request, res : Response){
        const auctionBussiness = new AuctionsBussiness();

        return res.json(await auctionBussiness.start(
            parseInt(req.params.id)
        ));
    }

    public async end(req: Request, res : Response){
        const auctionBussiness = new AuctionsBussiness()

        return res.json(await auctionBussiness.end(
            parseInt(req.params.id)
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