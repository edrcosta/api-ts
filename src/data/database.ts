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
            logging : true,
        });

        //table mapping
        this.tables = {
            auctions : this.connection.define('Auctions', AudictionModel, tableConfig),
            bids : this.connection.define('Bids', BidModel, tableConfig),
            users : this.connection.define('Users', UserModel, tableConfig),
        }

        //relationships
        // this.tables.auctions.hasOne(this.tables.bids, { forengKey: 'winning_bid', targetKey : 'id' });
        // this.tables.bids.hasOne(this.tables.audictions, { forengKey: 'audictions_id', targetKey : 'id' });
    }
}