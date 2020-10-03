import { AuctionController } from './controllers/auction'
import { AuthenticationController, BidController } from './controllers';
import { IEndpoint } from './interfaces'

const auctionController = new AuctionController();
const authenticationController = new AuthenticationController();
const bidController = new BidController();

export const EndpointList : IEndpoint[] = [
    { url: '/authentication', method: 'post', handdler: authenticationController.login, public: true },
    { url: '/auction/:id', method: 'get', handdler: auctionController.getOne, public: false },
    { url: '/auction/:id/end', method: 'put', handdler: auctionController.end, public: false },
    { url: '/auction/:id/start', method: 'put', handdler: auctionController.start, public: false },
    { url: '/auction/:auctionId/bid', method: 'post', handdler: bidController.create, public: false },    
    { url: '/auction', method: 'post', handdler: auctionController.create, public: false },
];