import { Crud } from '../data';

export class BidBussiness extends Crud 
{
    constructor(){
        super('bids', ['id', 'email', 'amount', 'auctions_id']);
    }
}