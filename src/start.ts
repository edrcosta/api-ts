import * as express from 'express';
import * as bodyparser from 'body-parser';

import { ConfigHelper, ResponseHelper } from './helpers';
import { EndpointList } from './endpoints';
import { IEndpoint } from './interfaces';
import { AuthenticationService } from './services'

const config = ConfigHelper.get();
const app = express();

const authentication = new AuthenticationService();
const auth = authentication.getAuthenticationmiddleware();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(ResponseHelper.httpHeader);
app.use(ResponseHelper.errorHanddler);

//loading endpoints
EndpointList.forEach((endpoint : IEndpoint) => {
    
    console.log('Loading endpoint', endpoint.url, endpoint.method)
    
    if(endpoint.public){
        app[endpoint.method](endpoint.url, endpoint.handdler);
    }else{
        app[endpoint.method](endpoint.url, auth, endpoint.handdler);
    }
});

app.listen(config.server.port, () => console.log(`listening on port ${config.server.port} :)`));