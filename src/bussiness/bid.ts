import { Crud } from '../data';

export class BidBussiness extends Crud 
{
    constructor(){
        super('bids', ['id', 'email', 'amount', 'auctions_id', 'created', 'updated']);
    }

    async getWinner(auctionId: number){

        const bidBussiness = new BidBussiness();
        
        const winner = await bidBussiness.getOneWhere(
            { auctions_id: auctionId },
            [
                ['amount', 'ASC']
            ]
        );

        if(!winner || typeof winner[0] === 'undefined') return null;

        return winner[0]
    }

    async countWithSameValue(bidAmount: number){

        const bidBussiness = new BidBussiness();

        //check bid format
        return await bidBussiness.countWhere({
            amount: bidAmount
        });
    }
}