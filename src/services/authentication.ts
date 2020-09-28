import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as exjwt from 'express-jwt';

import{ UsersBussiness } from '../bussiness';
import { ConfigHelper } from '../helpers';
import { iTokenData } from '../interfaces';

export class AuthenticationService
{
    public getAuthenticationmiddleware(){
        const config = ConfigHelper.get();

        //Loading endpoints
        let auth = new AuthenticationService();

        return exjwt({
            secret: config.jwt.secret,
            isRevoked: auth.validateAccessToken,
            algorithms: ['HS256']
        });

    }

    public createPassSaltHash(){

        const saltRounds = 10;
        const yourPassword = "123";

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(yourPassword, salt, (err, hash) => {
                // Now we can store the password hash in db.
                console.log(hash, salt)
            });
        });

    }

    public async validateAccessToken(req: express.Request, payload, done){
        try {
            
            const config = ConfigHelper.get();
            const users = new UsersBussiness();

            const token = req.headers['authorization'].replace('Bearer ', '')
            const tokenData : iTokenData = jwt.verify(token, config.jwt.secret);
            

            const user = await users.getOneWhere({
                username: tokenData.username
            });

            console.log(user)
            // console.log('aqui', database.tables.users)
            // database.tables.users.find((data) => {
            //     console.log(data)
            // })
            // console.log(tokenData);

            
            // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            //     if res == true, password matched
            //     else wrong password
            // });
            // auth.createPassSaltHash()
            // data.getRevokedToken(issuer, tokenId, function(err, token){
            
            return done(null);
            // });
        } catch (error) {
            return done(error);
        }
    };
    
}