import { Crud } from '../data';

export class AuctionsBussiness extends Crud 
{
    constructor(){
        super('auctions', ['id', 'status', 'description', 'item', 'email', 'starting_price', 'created', 'updated']);
    }
}