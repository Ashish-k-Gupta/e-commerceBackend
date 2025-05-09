import { Request, Response } from "express";
import { createOrderFromCartService, getOrderByIdService, getOrdersForUserService, updateOrderStatusService } from "../services/createOrderFromCartService";
import { error } from "console";
import { PaymentMethod } from "../entities/orderEntity";
import { userInfo } from "os";

export const createOrderFromCartController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req?.user?.id;
    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      res.status(400).json({ message: "Payment method is required." });
      return;
    }

      if (!Object.values(PaymentMethod).includes(paymentMethod)) {
        throw new Error("Invalid payment method");
      }

    const order = await createOrderFromCartService(userId, paymentMethod as PaymentMethod);

    res.status(201).json({ message: "Order created successfully.", order });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Couldn't place an order.",
        error: err instanceof Error ? err.message : "Unkown Error",
      });
  }
};

export const getOrdersForUser = async (req: Request, res: Response) =>{
  try{
    const userId =await req?.user?.id;
    const orders =await getOrdersForUserService(userId);
    res.status(201).json({orders})
  }catch(err){
    res.status(400).json({message: "Couldn't fetch order list", error: err instanceof Error ? err.message : "Unknown error"})
  }
}

export const getOrderById = async (req: Request, res: Response) =>{
  try{
    const userId = req?.user?.id;
    const orderId = req?.params?.id;
    const order = await getOrderByIdService(userId, orderId)
    res.status(201).json({order})
  }catch(err){
    res.status(400).json({message: 'Could find this order', error: err instanceof Error ? err.message : "Unknown Error"})
  }
}

export const updateOrderStatus = async(req: Request, res: Response) =>{
  try{
    const userId = req?.user?.id;
    const orderId = req?.params?.id;
    const {status} = req?.body
    const updatedOrder = await updateOrderStatusService(userId, orderId, status)
    res.status(201).json(updatedOrder)
  }catch(err){
    res.status(400).json({message: "Couldn't update the status of order", error: err instanceof Error? err.message : "Unknown error"})
  }

}