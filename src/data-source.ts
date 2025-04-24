import { DataSource } from "typeorm";
import { User } from "./entities/userEntity";
import dotenv from 'dotenv'
import { Product } from "./entities/productEntity";
import { OrderItem } from "./entities/orderItemEntity";
import { Order } from "./entities/orderEntity";
import { CartItem } from "./entities/cartItemEntity";
import { Cart } from "./entities/cartEntity";
import { Address } from "./entities/addressEntity";
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
    entities: [User, Product, OrderItem, Order, CartItem, Cart, Address], 
    migrations: []
})