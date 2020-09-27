import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { Config } from '../helpers';
import { BaseController } from './base-controller';

import * as jwt from 'jsonwebtoken';

export class Authentication extends BaseController
{
    public async login(req : IAuthRequest, res : Response){

        const config = Config.get();

        //Mock of users
        const applicationUsers = [
            {
                id: 1,
                username: 'admin',
                password: '123'
            }
        ];

        const { username, password } = req.body;

        for (const user of applicationUsers) {
            if (username == user.username && password == user.password) {

                const token = jwt.sign(
                    { 
                        id: user.id, 
                        username: user.username 
                    }, 
                    config.jwt, 
                    { expiresIn: 129600 }
                );

                res.status(200).json(this.formatedResponse({
                    token: token
                }));
                break;
            }
            else {
                res.status(401).json({
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        }
    }
}