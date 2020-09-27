export interface IEndpoint {
    url : string
    public? : boolean
    handdler : Function
    method : string
}

export interface IGetRequest{
    body : {
        page? : number,
        brand? : number,
        model? : number,
    }
}

export interface IRemoveRequest{
    params : {
        id : number
    }
}

export interface IUpdateRequest<T>{
    params : {
        id : number
    },
    body : T
}

export interface ICreateRequest<T>{
    body : T
}

export interface IAuthRequest{
    body : {
        username : string,
        password : string,
    }
}