import { Sequelize } from 'sequelize';
import { Config } from '../helpers';
import { IConfig } from '../interfaces';

import { 
    AudictionModel,
    BidModel
} from './models';

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

        this.config = Config.get();

        this.connection = new Sequelize(this.config.database, {
            dialect : 'mysql',
            logging : false,
        });

        this.tables = {
            audictions : this.connection.define('Audictions', AudictionModel, tableConfig),
            bids : this.connection.define('Bids', BidModel, tableConfig),
        }
    }
}