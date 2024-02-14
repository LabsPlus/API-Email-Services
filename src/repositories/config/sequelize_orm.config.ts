import { Sequelize } from "sequelize-typescript";
import databaseConfig from '../../configs/database.config';
import { Key, Login, Usuario } from '../../model/index';

const sequelize = new Sequelize(databaseConfig);

export default class SequelizeORM {
    
    async connect() {
        try {
            await sequelize.authenticate();
            await sequelize.addModels([Usuario, Login, Key]);
            await sequelize.sync();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async close() {
        try {
            await sequelize.close();
            console.log('Connection has been closed successfully.');
        }
        catch (error) {
            console.error('Unable to close the database:', error);
        }
    }

    async getTransaction() {
        try {
            return await sequelize.transaction();
        }
        catch (error) {
            console.error('Unable to get transaction:', error);
        }
    }
};