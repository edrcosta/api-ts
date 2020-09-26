Project:

Create a service in which you can:

-  Create an auction
-  Start an auction
-  End an auction
-  Place bids on an auction
-  Has an auction watcher

Users will be able to place bids on items.

Constraints:

-  This challenge is required to be completed in Node.js, other than the runtime environment all tools are allowed.
-  The service must contain an automatic way of ending the auction.
-  Auction Data should have this format
{
    id: unique identifier
    Item: string,
    Description: String,
    email: String
    startingPrice: float,
    status: enum('waiting', 'ongoing', 'finished'),
    winningBid: unique identifier(reference to the bid)
    startTime: Date,
    endTime: Date,
}
-  Bid data should be stored this way:
{
    id: unique identifier,
    email: string,
    amount: float
    auctionId: unique identifier (reference to the auction)
}
-  Responses from the api should have this format:
{
Meta: {
    status: HTTPResponseStatus
    now: Unixtimestamp,
    requestId: uuid
},
Result: {
    Contains the data to be displayed(…)
}}
Bonus points:
- Unit/Integration Tests
- containerization with any containerization tool (i.e: Docker, rkt, snappy)
- Implement a logging system to track requests
- Adding pagination to getting all auctions endpoint