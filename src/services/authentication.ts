import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import * as exjwt from 'express-jwt';

import{ UsersBussiness } from '../bussiness';
import { ConfigHelper } from '../helpers';
import { IConfig } from '../interfaces';

export class AuthenticationService
{
    config: IConfig

    constructor(){
        this.config = ConfigHelper.get();
    }

    public getAuthenticationmiddleware(){
        const auth = new AuthenticationService();

        return exjwt({
            secret: this.config.jwt.secret,
            isRevoked: auth.validateAccessToken,
            algorithms: ['HS256']
        });
    }

    public createPassSaltHash(password: string){
        return new Promise((resolve, reject) => {

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);

            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err);
                resolve({hash, salt});
            });
        });
    }

    public compareHashPassword(hash: string, password: string){
        return bcrypt.compareSync(password, hash)
    }

    public async validateAccessToken(req: Request, payload, done){
        try {
            
            const users = new UsersBussiness();

            const tokenData: any = jwt.verify(
                req.headers['authorization'].replace('Bearer ', ''), 
                this.config.jwt.secret
            );
            
            const user = await users.getOneWhere({
                username: tokenData.username
            });

            if(!user || !user[0]) return done(true);

            if(user[0].username === tokenData.username){
                return done(null);
            }else{
                return done(true);
            }
        } catch (error) {
            return done(error);
        }
    };
}