/**
 * This is a generic crud class.. 
 * 
 * most part of simple crud operations are very standard
 * this class is a generalization of standard crud operations
 * any bussiness logic can be put on a bussiness class
 */
import { Database } from './database';
import { ConfigHelper } from '../helpers';

export class Crud 
{
    private table : string;
    private fields : string[];
    private db : Database;

    constructor(table : string, fields : string[]){
        this.table = table;
        this.fields = fields;
        this.db = new Database();
    }

    list<T>(page? : number): Promise<T>{

        page = page ? page : 1;

        const perPage = ConfigHelper.get().endpoint.perPage;
        const offset = perPage * page - perPage;

        return this.db.tables[this.table].findAll({ offset: offset, limit: perPage, 
            attributes: this.fields, raw: true
        });
    }

    getOneWhere<T>(where : any, orderBy?: [string[]]): Promise<T>{
        return this.db.tables[this.table].findAll({   
            limit : 1,
            where: where, 
            attributes: this.fields, 
            raw: true,
            order: orderBy
        });
    }

    getOneById<T>(id : number): T{
        return this.db.tables[this.table].findAll({   
            limit : 1,
            where: {id: id}, 
            attributes: this.fields, 
            raw: true
        });
    }

    validate<T>(data : any): Promise<T>{
        return new Promise((resolve : any) => {
            this.db.tables[this.table].build(data)
                .validate()
                .then(() => {
                    resolve(false);
                })
                .catch((err) => { 
                    resolve(err.errors.map((e) => e.message));
                });
        });
    }

    create<T>(data : any): Promise<T>{        
        return this.db.tables[this.table].create(data);
    }

    update<T>(id : number, data : any): Promise<T>{
        return this.db.tables[this.table].update(data, { where: { id: id } });
    }

    remove<T>(id : number): Promise<T>{
        return this.db.tables[this.table].destroy({ where: { id: id } });
    }

    countWhere<T>(where:any): Promise<T>{
        return this.db.tables[this.table].count({ where: where });
    }
}