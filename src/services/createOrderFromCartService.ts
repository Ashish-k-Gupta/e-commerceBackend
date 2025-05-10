import { AppDataSource } from "../config/data-source";
import { Cart } from "../entities/cartEntity";
import { CartItem } from "../entities/cartItemEntity";
import { Order, OrderStatus, PaymentMethod } from "../entities/orderEntity";
import { OrderItem } from "../entities/orderItemEntity";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";
import { OrderListResponse } from "../types/express/order.types";

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
    await OrderItemRepo.save(orderItems);
    totalAmount += cartItem.quantity * parseFloat(cartItem.price.toString());

    orderItems.push(orderItem);
  }

  const order = orderRepo.create({
    user,
    orderItems,
    totalAmount,
    paymentMethod,
    status: OrderStatus.PENDING
  })
  await orderRepo.save(order)
  await cartItemRepo.remove(cart.cartItems);
  return order;
};

export const getOrdersForUserService = async(userId: string):Promise<Order[]> =>{
  const orders =  await orderRepo.find({where:{user: {id: userId}},
  relations: ["orderItems", "orderItems.product"]})
  return orders
}

export const getOrderByIdService = async(userId: string, orderId: string): Promise<Order>=>{
  const order  = await orderRepo.findOne({
    where: {
      id: orderId,
      user:{
        id: userId,
      },
    },
    relations: ['user', 'orderItems', 'orderItems.product'],
    select:{
      id: true,
      status: true,
      totalAmount: true,
      paymentMethod: true,
      user:{
        firstName: true,
        phoneNumber: true
      },
      orderItems:{
        id: true,
        quantity: true,
        price:true,
        product:{
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
        }
      }
    }

  })

 if(!order){
  throw new Error("Order not found")
 }
 return order
}

export const updateOrderStatusService = async(userId: string, orderId: string, status: OrderStatus ):Promise<Order> =>{
  const order = await orderRepo.findOne({
    where:{
      id: orderId,
      user: {id: userId}
    },
    relations: ['user']
  })
if(!order){
  throw new Error (`Order with ${orderId} doesn't exist`)
}
  order.status = status;
  return await orderRepo.save(order)
}

export const deleteOrderService = async(userId: string, orderId: string): Promise<Order> =>{
   const order = await orderRepo.findOne({
    where:{ 
    id: orderId ,
    user: {id: userId}
   },
   relations: ['user']
  })
  if(!order){
      throw new Error(`Order with ID ${orderId} doesn't exist or doesn't belong to user ${userId}`);
  }
  if(order.deletedAt){
    throw new Error (`Order with ID ${orderId} has already been deleted`);;;
  }
  return await orderRepo.softRemove(order)
}

export const getAllOrders = async(page: number, pageSize: number): Promise<OrderListResponse> =>{
  const [allOrders, total] = await orderRepo.findAndCount({
    relations: ['user'],
    skip: (page -1) * pageSize,
    take: pageSize
  })

  if(allOrders.length === 0){
    throw new Error(`No order exists in the system`)
  }
  return {
    orders: allOrders,
    totalOrders: total,
    totalPages: Math.ceil(total / pageSize),
  };
}