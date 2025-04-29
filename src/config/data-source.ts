import { DataSource } from "typeorm"
import { Address } from "../entities/addressEntity"
import { Cart } from "../entities/cartEntity"
import { CartItem } from "../entities/cartItemEntity"
import { Order } from "../entities/orderEntity"
import { OrderItem } from "../entities/orderItemEntity"
import { Product } from "../entities/productEntity"
import { User } from "../entities/userEntity"
import dotenv from 'dotenv'

dotenv.config()


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: 'ecommerce_db',
    synchronize: true,
    logging: false,
    entities: [User, Product, OrderItem, Order, CartItem, Cart, Address], 
    migrations: []
})