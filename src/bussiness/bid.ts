import { Crud } from '../data';

export class BidBussiness extends Crud 
{
    constructor(){
        super('bids', ['id', 'email', 'amount', 'auctions_id']);
    }

    async getWinner(auctionId: number){

        const bidBussiness = new BidBussiness();
        
        return await bidBussiness.getOneWhere(
            { auctions_id: auctionId },
            [
                ['amount', 'ASC']
            ]
        );
    }

    async countWithSameValue(bidAmount: number){

        const bidBussiness = new BidBussiness();

        //check bid format
        return await bidBussiness.countWhere({
            amount: bidAmount
        });
    }
}