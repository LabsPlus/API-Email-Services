import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import 'reflect-metadata';

const DB_CONFIG = process.env.POSTGRES_URL as string;

const sequelize = new Sequelize(DB_CONFIG,{
    logging: false,
    native: false,
});

export {sequelize};