export const AudictionModel = {
    id: unique identifier
    Item: string,
    Description: String,
    email: String,
    startingPrice: float,
    status: enum('waiting', 'ongoing', 'finished'),
    winningBid: unique identifier(reference to the bid)
    startTime: Date,
    endTime: Date,
}