import { Crud } from '../data';
import { AuctionsBussiness } from '../bussiness';
import { iCreateBidData } from '../interfaces';

export class BidBussiness extends Crud 
{
    constructor(){
        super('bids', ['id', 'email', 'amount', 'auctions_id', 'created', 'updated']);
    }

    async getWinner(auctionId: number){

        const winner = await this.getOneWhere(
            { auctions_id: auctionId },
            [
                ['amount', 'ASC']
            ]
        );

        if(!winner || typeof winner[0] === 'undefined') return null;

        return winner[0];
    }

    async countWithSameValue(bidAmount: number){
        return await this.countWhere({
            amount: bidAmount
        });
    }

    async addBidToAuction(auctionId: number, data: iCreateBidData){
        
        const bidBussiness = new BidBussiness();
        const auctionBussiness = new AuctionsBussiness();

        //check bid format
        const errors = await bidBussiness.validate(data);

        if(errors){
            return { errors: errors };
        }

        //prevent double
        if(await bidBussiness.countWithSameValue(data.amount) > 0){
            return {
                errors: [
                    'auction now cost more'
                ]
            };
        }

        //check auction status
        const auctionData = await auctionBussiness.getOneById(auctionId);

        if(typeof auctionData[0].status === 'undefined' || auctionData[0].status !== 'ongoing'){
            return {
                errors: ['this action is not ongoing']
            };
        }

        return await this.create({
            email: data.email,
            amount: data.amount,
            auctions_id: auctionId
        });
    }
}