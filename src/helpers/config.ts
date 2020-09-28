import * as fs from 'fs';
import { IConfig } from '../interfaces';

export class ConfigHelper
{
    static config : IConfig = null;

    static get() : IConfig
    {
        //singleton
        if(!ConfigHelper.config){ 
            
            const file = `${__dirname.replace('src/helpers', '')}config.json`;
            const dbfile = `${__dirname.replace('src/helpers', '')}db-config.json`;

            if(!fs.existsSync(file)) throw `Config file is missing please create`;
            if(!fs.existsSync(dbfile)) throw `Config file is missing please create`;
            
            //require in runtime that whay changes are apply live
            //each execution will get this setting
            let config = require(file);
            const database = require(dbfile);
            const db = database[config.env];

            //@todo change this 
            config.database = `${db.dialect}://${db.username}:${db.password}@${db.host}/${db.database}`;

            ConfigHelper.config = config;
        }

        return ConfigHelper.config;
    }
}