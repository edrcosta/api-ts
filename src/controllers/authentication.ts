import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { ConfigHelper, ResponseHelper } from '../helpers';
import { BaseController } from './base-controller';
import { AuthenticationService } from '../services';
import{ UsersBussiness } from '../bussiness';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthenticationController extends BaseController
{
    authenticationError = {
        token: null,
        err: 'Username or password is incorrect'
    }

    public async login(req : IAuthRequest, res : Response){

        const authService = new AuthenticationService();
        const users = new UsersBussiness();

        const config = ConfigHelper.get();
        const { username, password } = req.body;
        
        const user = await users.getOneWhere({
            username: username
        });

        if(!user || !user[0]){
            return res.status(401).json(this.authenticationError);
        }
        
        if(authService.compareHashPassword(user[0].password_hash, password)){
            
            const userData = { 
                id: user[0].id, 
                username: username,
                randhash: bcrypt.genSaltSync(20)
            };
            
            const response = ResponseHelper.formatData({
                token: jwt.sign(userData, config.jwt.secret)
            });
            
            return res.status(200).json(response);
        }

        return res.status(401).json(this.authenticationError);
    }
}