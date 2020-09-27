import { AuctionController } from './controllers/auction'
import { IEndpoint } from './interfaces'

const auctionController = new AuctionController();

export const EndpointList : IEndpoint[] = [
    { url: '/auction', method: 'post', handdler: auctionController.create, public: false },
    { url: '/auction/:id/end', method: 'post', handdler: auctionController.end, public: false },
    { url: '/auction/:id/start', method: 'post', handdler: auctionController.start, public: false },
    { url: '/auction/:id/bid', method: 'post', handdler: auctionController.addBid, public: false },
    { url: '/auction', method: 'get', handdler: auctionController.getOne, public: false },
];