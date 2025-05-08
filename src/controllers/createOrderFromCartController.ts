import { Request, Response } from "express";
import { createOrderFromCartService } from "../services/createOrderFromCart";
import { error } from "console";

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

    const order = await createOrderFromCartService(userId, paymentMethod);

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
