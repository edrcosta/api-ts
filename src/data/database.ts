import { Sequelize } from 'sequelize';
import { ConfigHelper } from '../helpers';
import { IConfig } from '../interfaces';

import { AudictionModel, BidModel, UserModel } from './models';

export class Database 
{    
    private connection : Sequelize;
    
    public config : IConfig;
    public tables : any;

    constructor(){

        const tableConfig = {
            timestamps: false,
            underscored: true
        };

        this.config = ConfigHelper.get();

        this.connection = new Sequelize(this.config.database, {
            dialect : 'mysql',
            logging : false,
        });

        //table mapping
        this.tables = {
            audictions : this.connection.define('Audictions', AudictionModel, tableConfig),
            bids : this.connection.define('Bids', BidModel, tableConfig),
            users : this.connection.define('Users', UserModel, tableConfig),
        }

        //relationships
        this.tables.audictions.hasOne(this.tables.bids, { forengKey: 'winning_bid', targetKey : 'id' });
        this.tables.bids.hasOne(this.tables.audictions, { forengKey: 'audictions_id', targetKey : 'id' });
    }
}