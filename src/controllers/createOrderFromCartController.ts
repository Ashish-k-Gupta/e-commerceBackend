import { NextFunction, Request, Response } from "express";
import { createOrderFromCartService, deleteOrderService, getAllOrdersService, getOrderByIdService, getOrdersForUserService, updateOrderStatusService } from "../services/createOrderFromCartService";
import { OrderStatus, PaymentMethod } from "../entities/orderEntity";
import { GetOrdersParams } from "../types/express";

export const createOrderFromCartController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req?.user!.id;
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
    const userId =await req?.user!.id;
    const orders =await getOrdersForUserService(userId);
    res.status(201).json({orders})
  }catch(err){
    res.status(400).json({message: "Couldn't fetch order list", error: err instanceof Error ? err.message : "Unknown error"})
  }
}

export const getOrderById = async (req: Request, res: Response) =>{
  try{
    const userId = req?.user!.id;
    const orderId = req?.params?.id;
    const order = await getOrderByIdService(userId, orderId)
    res.status(201).json({order})
  }catch(err){
    res.status(400).json({message: 'Could find this order', error: err instanceof Error ? err.message : "Unknown Error"})
  }
}

export const updateOrderStatus = async(req: Request, res: Response) =>{
  try{
    const userId = req?.user!.id;
    const orderId = req?.params?.id;
    const {status} = req?.body
    const updatedOrder = await updateOrderStatusService(userId, orderId, status)
    res.status(201).json(updatedOrder)
  }catch(err){
    res.status(400).json({message: "Couldn't update the status of order", error: err instanceof Error? err.message : "Unknown error"})
  }

}

export const deleteOrder = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    const userId = req?.user!.id;
    const orderId = req?.params?.id;
    
    const deleteOrder = await deleteOrderService(userId, orderId)
    res.status(201).json({
      message: "Order successfully deleted",
      deleteOrder: "abc123"
    })
  }catch(err){
    res.status(400).json({
      message: "Couldn't delete the order",
      error: err instanceof Error ? err.message : "Unknown error"
    })
  }
      
}

export const getAllOrder = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const{
      page = '1',
      pageSize = '10', 
      status,
      userId,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
    } = req.query

    const params: GetOrdersParams ={
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
      filters:{
        status: status as OrderStatus,
        userId: userId as string,
        dateFrom:  dateFrom ? new Date(dateFrom as string): undefined,
        dateTo: dateTo ? new Date (dateTo as string): undefined,
      },
      sortBy: sortBy as 'createdAt' | 'totalAmount',
      sortOrder: sortOrder as 'ASC' | 'DESC'
    }
    const orders = await getAllOrdersService(params)
    res.status(201).json({orders})
  }catch(err){
    res.status(400).json({
      message: 'Could not fetch the order list',
      error: err instanceof Error ? err.message : "Unknown error"

    })
  }
}