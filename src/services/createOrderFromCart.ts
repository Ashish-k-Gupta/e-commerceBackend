import { AppDataSource } from "../config/data-source";
import { Cart } from "../entities/cartEntity";
import { CartItem } from "../entities/cartItemEntity";
import { Order, PaymentMethod } from "../entities/orderEntity";
import { OrderItem } from "../entities/orderItemEntity";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const userRepo = AppDataSource.getRepository(User);
const productRepo = AppDataSource.getRepository(Product);
const cartRepo = AppDataSource.getRepository(Cart);
const cartItemRepo = AppDataSource.getRepository(CartItem);
const orderRepo = AppDataSource.getRepository(Order);
const OrderItemRepo = AppDataSource.getRepository(OrderItem);

export const createOrderFromCartService = async (
  userId: string,
  paymentMethod: PaymentMethod,
): Promise<Order> => {

  const user = await userRepo.findOneByOrFail({ id: userId });
  const cart = await cartRepo.findOne({
    where: { user: { id: userId } },
    relations: ["cartItems", "cartItems.product"],
  });

  if (!cart || cart.cartItems.length === 0) {
    throw new Error("Cannot create an order, cart is empty, .");
  }

  let totalAmount = 0;
  const orderItems: OrderItem[] = [];

  for (const cartItem of cart.cartItems) {
    const product = cartItem.product;

    if (product.stock < cartItem.quantity) {
      throw new Error(
        `Not enough stock for product "${product.name}". Available: ${product.stock}, Requested: ${cartItem.quantity}`,
      );
    }

    product.stock -= cartItem.quantity;
    await productRepo.save(product);
    const orderItem = OrderItemRepo.create({
      product,
      quantity: cartItem.quantity,
      price: cartItem.price,
    });

    totalAmount += cartItem.quantity * parseFloat(cartItem.price.toString());

    orderItems.push(orderItem);
  }

  const order = orderRepo.create({
    user,
    orderItems,
    totalAmount,
    paymentMethod,
    status: "pending",
  });

  await cartItemRepo.remove(cart.cartItems);
  return order;
};
