export interface IConfig{
    server : {
        port : number
    },
    jwt_secret: string,
    database : string,
    endpoint : {
        perPage : 10
    }
}