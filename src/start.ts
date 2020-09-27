import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as exjwt from 'express-jwt';

import { Config } from './helpers/config';
import { EndpointList } from './endpoints';
import { IEndpoint } from './interfaces';

const config = Config.get();
const app = express();

//setup server
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    console.log(`new HTTP request ${req.method} :: ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.server.port}`);
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

//Loading endpoints
const jwtMiddleware = exjwt({ secret: config.jwt_secret});

EndpointList.forEach((endpoint : IEndpoint) => {
    
    console.log('Loading endpoint', endpoint.url, endpoint.method)
    
    if(endpoint.public){
        app[endpoint.method](endpoint.url, endpoint.handdler);
    }else{
        app[endpoint.method](endpoint.url, jwtMiddleware, endpoint.handdler);
    }
});

//Setup error handdler
app.use(function (err : express.ErrorRequestHandler, req : express.Request, res : express.Response, next : express.NextFunction) {
    console.log(req);
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(err);//pretty auth error
    }else {
        next(err);
    }
});

app.listen(config.server.port, () => console.log(`listening on port ${config.server.port} :)`));