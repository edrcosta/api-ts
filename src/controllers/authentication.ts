import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { ConfigHelper, ResponseHelper } from '../helpers';
import { BaseController } from './base-controller';

import * as jwt from 'jsonwebtoken';

export class AuthenticationController extends BaseController
{
    public async login(req : IAuthRequest, res : Response){

        const config = ConfigHelper.get();

        //Mock of users
        const applicationUsers = [
            {
                id: 1,
                username: 'edercosta',
                password: '123'
            }
        ];

        const { username, password } = req.body;

        for (const user of applicationUsers) {
            if (username == user.username && password == user.password) {

                const userData = { 
                    id: user.id, 
                    username: user.username 
                };
                
                const response = ResponseHelper.formatData({
                    token: jwt.sign(userData, config.jwt.secret)
                });
                
                res.status(200).json(response);
                break;
            } else {
                res.status(401).json({
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        }
    }
}