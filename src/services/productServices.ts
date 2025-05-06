import { AppDataSource } from "../config/data-source";
import { addProduct } from "../dtos/product.dto";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const productRepo = AppDataSource.getRepository(Product)
const userRepo = AppDataSource.getRepository(User)

export const addProductService = async (userId: string, productData: addProduct):Promise <Product> =>{
    const user = await userRepo.findOneOrFail({
        where: {
        id: userId
        }
    })
    const product = productRepo.create({
        ...productData,
        createdBy: user
    })
    return productRepo.save(product)
}