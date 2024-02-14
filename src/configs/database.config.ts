import { join } from "path";
import { SequelizeOptions } from "sequelize-typescript";

const databaseConfig: SequelizeOptions = {

    database: process.env.POSTGRES_DATABASE || 'emailServices',
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'root',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    models: [join(__dirname, '../model/*')],
    define: {
        timestamps: true,
        underscored: true,
    },
}

export default databaseConfig;