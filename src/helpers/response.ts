export class ResponseHelper
{
    static formatData(data){
        return {
            meta: {
                status: 200,
                now: new Date(),
                requestId: 123
            },
            result: data
        }
    }
}