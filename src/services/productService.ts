import { AppDataSource } from "../config/data-source";
import { CreateProductDto } from "../dtos/product.dto";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const productRepo =  AppDataSource.getRepository(Product);
const userRepo = AppDataSource.getRepository(User);

export const createProduct = async(userId: string, payload: CreateProductDto): Promise<Product | void> =>{
    const user = await userRepo.findOne({where:{id: userId}})

    if(!user){
        throw new Error("User not found")
    }
}