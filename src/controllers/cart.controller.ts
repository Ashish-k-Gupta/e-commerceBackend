import { NextFunction, Request, Response } from "express";
import {
  addItemToCartService,
  clearCartService,
  getOrCreateCartService,
  updatedCartItemQuanityService,
} from "../services/cartService";
import { error } from "console";

export const getOrCreateCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.user!.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: user ID missing" });
    }
    const cart = await getOrCreateCartService(userId);
    res.status(201).json({ cart });
  } catch (err) {
    res.status(400).json({
      message: "Could not access cart",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Missing ot empty request body" });
      return;
    }
    const userId = req?.user?.id;
    const { productId, quantity } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: user ID missing" });
      return;
    }

    const parsedQuantity = Number(quantity);
    if (!productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      res.status(400).json({ message: "Invalid product ID or quantity" });
      return;
    }

    const item = await addItemToCartService(userId, productId, parsedQuantity);
    res.status(201).json({ item });
  } catch (err) {
    res.status(400).json({
      message: "Could not add item to cart",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updatedCartItemQuanity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "Missing ot empty request body" });
      return;
    }
    const userId = req?.user?.id;
    const { productId, quantity } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: user ID missing" });
      return;
    }

    const parsedQuantity = Number(quantity);
    if (!productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      res
        .status(400)
        .json({
          message:
            "Invalid product ID or quantity (must be 0 or positive number)",
        });
      return;
    }
    const updatedCart = updatedCartItemQuanityService(
      userId,
      productId,
      quantity,
    );
    res.status(200).json({
      message: `The quanity of product in cart updated successfully}`,
      item: updatedCart,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error updating cart item quantity",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.user!.id;
    await clearCartService(userId);
    res.status(200).json({ message: "You cart has been cleared" });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Couldn't clear the cart",
        error: err instanceof Error ? err.message : "Unknown error",
      });
  }
};
