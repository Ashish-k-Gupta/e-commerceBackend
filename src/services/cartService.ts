import { AppDataSource } from "../config/data-source";
import { Cart } from "../entities/cartEntity";
import { CartItem } from "../entities/cartItemEntity";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const cartRepo = AppDataSource.getRepository(Cart);
const cartItemRepo = AppDataSource.getRepository(CartItem);
const userRepo = AppDataSource.getRepository(User);
const productRepo = AppDataSource.getRepository(Product);

export const getOrCreateCartService = async (userId: string): Promise<Cart> => {
  let cart = await cartRepo.findOne({
    where: { user: { id: userId } },
    relations: ["cartItems", "cartItems.product"],
  });

  if (!cart) {
    const user = await userRepo.findOneByOrFail({ id: userId });
    cart = cartRepo.create({ user, cartItems: [] });
    await cartRepo.save(cart);
  }
  return cart;
};

export const addItemToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<Cart> => {
  const cart = await getOrCreateCartService(userId);
  const product = await productRepo.findOneByOrFail({ id: productId });

  if (product.stock <= 0) {
    throw new Error(`Product "${product.name}" is out of stock and cannot be added to the cart.`);
}

  const existingItem = cart.cartItems.find(
    (item) => item.product.id === productId,
  );
  if (existingItem) {
    existingItem.quantity += quantity;
    await cartItemRepo.save(existingItem);
  } else {
    if (
      product.price === undefined ||
      product.price === null ||
      isNaN(Number(product.price))
    ) {
      throw new Error(
        `Product with ID ${productId} does not have a valid price`,
      );
    }
    const newItem = cartItemRepo.create({
      cart,
      product,
      quantity,
      price: product.price,
    });
    await cartItemRepo.save(newItem);
  }
  return getOrCreateCartService(userId);
};

export const updatedCartItemQuanityService = async (
  userId: string,
  productId: string,
  quantity: number,
  price: number,
): Promise<Cart> => {
  const cart = await getOrCreateCartService(userId);
  const item = cart.cartItems.find((item) => item.product.id === productId);

  if (!item) {
    throw new Error("item not found in cart");
  }
  if (quantity <= 0) {
    await cartItemRepo.remove(item);
  } else {
    item.quantity = quantity;
    await cartItemRepo.save(item);
  }

  return getOrCreateCartService(userId);
};

export const removeItemFromCartService = async (
  userId: string,
  productId: string,
): Promise<Cart> => {
  const cart = await getOrCreateCartService(userId);
  const item = cart.cartItems.find((item) => item.product.id === productId);

  if (item) {
    await cartItemRepo.remove(item);
  }
  return getOrCreateCartService(userId);
};

export const clearCartService = async (userId: string): Promise<Cart> => {
  const cart = await getOrCreateCartService(userId);
  await cartItemRepo.remove(cart.cartItems);
  return getOrCreateCartService(userId);
};
