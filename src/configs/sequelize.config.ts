import databaseConfig from "./database.config";
import { Sequelize } from "sequelize";

const dataConfig = {
    database: databaseConfig.database,
    username: databaseConfig.username,
    password: databaseConfig.password,
}

const database = new Sequelize(dataConfig);

export default database;