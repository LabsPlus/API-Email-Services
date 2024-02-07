import 'dotenv/config';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

const portDb = process.env.PORT_DB as number | undefined;
const sslOption = process.env.DB_SSL === 'true' ? true : process.env.DB_SSL === 'false' ? false : undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
	host: process.env.DB_HOST,
	port: portDb,
	ssl: sslOption,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})