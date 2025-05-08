import { AppDataSource } from "../config/data-source";
import { addProduct, updateProduct } from "../dtos/product.dto";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const productRepo = AppDataSource.getRepository(Product);
const userRepo = AppDataSource.getRepository(User);

export const addProductService = async (
  userId: string,
  productData: addProduct,
): Promise<Product> => {
  const user = await userRepo.findOneOrFail({
    where: {
      id: userId,
    },
  });
  const product = productRepo.create({
    ...productData,
    createdBy: user,
  });
  return productRepo.save(product);
};

export const getProductService = async (): Promise<Product[]> => {
  const products = await productRepo.find({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      imageUrl: true,
    },
  });
  return products;
};

export const deleteProductService = async (
  productId: string,
): Promise<void> => {
  const product = await productRepo.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }

  await productRepo.remove(product);
};

export const updateProductService = async (
  productId: string,
  payload: updateProduct,
): Promise<Product> => {
  const product = await productRepo.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  Object.assign(product, payload);
  return productRepo.save(product);
};
