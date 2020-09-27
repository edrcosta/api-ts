import { AuctionController } from './controllers/auction'

const auctionController = new AuctionController();

export const EndpointList = [
    { url: 'auction', method: 'POST', handdler: auctionController.create },
    { url: 'auction/:id/end', method: 'POST', handdler: auctionController.end },
    { url: 'auction/:id/start', method: 'POST', handdler: auctionController.start },
    { url: 'auction/:id/bid', method: 'POST', handdler: auctionController.addBid },
    { url: 'auction', method: 'GET', handdler: auctionController.getOne },
];