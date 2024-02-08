import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import 'reflect-metadata';

const portDb = process.env.PORT_DB as number | undefined;
const sslOption = process.env.DB_SSL === 'true' ? true : process.env.DB_SSL === 'false' ? false : undefined;
const databaseUrl = process.env.DATABASE_URL as string;
const dialect = process.env.DIALECT as string;

const AppDataSource = new Sequelize(databaseUrl, {
	dialect: 'postgres',
	port: portDb,
	ssl: sslOption,
	models: [__dirname + '/models'],
});

export { AppDataSource};