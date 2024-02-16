import databaseConfig from "./database.config";
import { Sequelize, Dialect } from "sequelize";

const dataConfig = {
    database: databaseConfig.database,
    username: databaseConfig.username,
    password: databaseConfig.password,
    dialect: databaseConfig.dialect as Dialect | undefined,
}

const database = new Sequelize(dataConfig);

export default database;