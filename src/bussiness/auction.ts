import { Crud } from '../data';
import { ResponseHelper } from '../helpers';
import { BidBussiness } from './';

export class AuctionsBussiness extends Crud 
{
    constructor(){
        super('auctions', ['id', 'status', 'description', 'item', 'email', 'starting_price', 'created', 'updated']);
    }

    error = ResponseHelper.formatData({ errors: ['error to finish']});

    async start(auctionId: number){
        
        const verifyStatus = await this.countWhere({
            status: 'finished',
            id: auctionId
        });

        if(verifyStatus && verifyStatus > 0){
            return {
                status: 'finished'
            }
        }

        const result = await this.update(auctionId, {
            status: 'ongoing'
        });

        if(!result) return this.error;            
    
        return { status: 'ongoing'};
    }

    async end(auctionId: number){
        const bidBussiness = new BidBussiness();

        const result = await this.update(auctionId, {
            status: 'finished',
            winner: await bidBussiness.getWinner(auctionId)
        });

        if(!result) return this.error;

        const winner = await bidBussiness.getWinner(auctionId);

        return { 
            status: 'finished',
            winner: winner
        }
    }
}