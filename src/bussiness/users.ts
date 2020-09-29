import { Crud } from '../data';

export class UsersBussiness extends Crud 
{
    constructor(){
        super('users', ['id', 'username', 'password_salt', 'password_hash']);
    }
}