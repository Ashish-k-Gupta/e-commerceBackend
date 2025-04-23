import { DataSource } from "typeorm";
import { User } from "./entities/userEntity";
import dotenv from 'dotenv'
dotenv.config()


export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: 'ecommerce_db',
    synchronize: true,
    logging: true,
    entities: [User], 
    migrations: []
})