/**
 * This is a generic crud class.. 
 * 
 * most part of simple crud operations are very standard
 * this class is a generalization of standard crud operations
 * any bussiness logic can be put on a bussiness class
 */
import { Database } from './database';
import { ConfigHelper } from '../helpers';

export class Crud {

    private table : string;
    private fields : any;
    private db : Database;

    constructor(table : string, fields : any){
        this.table = table;
        this.fields = fields;
        this.db = new Database();
    }

    list(page? : number){

        page = page ? page : 1;

        const perPage = ConfigHelper.get().endpoint.perPage;
        const offset = perPage * page - perPage;

        return this.db.tables[this.table].findAll({ offset: offset, limit: perPage, 
            attributes: this.fields, raw: true
        });
    }

    getOneWhere(where : any){
        return this.db.tables[this.table].findAll({   
            limit : 1,
            where: where, 
            attributes: this.fields, 
            raw: true
        });
    }

    getOneById(id : number){
        return this.db.tables[this.table].findAll({   
            limit : 1,
            where: {id: id}, 
            attributes: this.fields, 
            raw: true
        });
    }

    validate(data : any){
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

    create(data : any){        
        return this.db.tables[this.table].create(data);
    }

    update(id : number, data : any){
        return this.db.tables[this.table].update( data, { where: { id: id } });
    }

    remove(id : number){
        return this.db.tables[this.table].destroy({ where: { id: id } });
    }

    countWhere(where:any){
        return this.db.tables[this.table].count({ where: where });
    }
}