export interface IConfig{
    server : {
        port : number
    },
    jwt: { 
        secret: string, 
        algorithms: [string]
    },
    database : string,
    endpoint : {
        perPage : 10
    }
}