export class BaseController
{
    formatedResponse(data){
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