import { Response } from 'express';
import { IAuthRequest } from '../interfaces';

import { BaseController } from './base-controller';
import { AuthenticationService } from '../services';
import { ResponseHelper } from '../helpers';

export class AuthenticationController extends BaseController
{
    authenticationError = {
        token: null,
        err: 'Username or password is incorrect'
    }

    public async login(req : IAuthRequest, res : Response){

        const authService = new AuthenticationService();

        const token = await authService.validateUserAndGetToken(req.body.username, req.body.password);

        if(token){
            return res.status(200).json(
                ResponseHelper.formatData({token: token})
            );
        }else{
            return res.status(401).json(this.authenticationError);
        }
    }
}