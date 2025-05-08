import { NextFunction, Request, Response } from "express";
import {
  addItemToCartService,
  getOrCreateCartService,
} from "../services/cartService";

export const getOrCreateCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: user ID missing" });
    }
    const cart = await getOrCreateCartService(userId);
    res.status(201).json({ cart });
  } catch (err) {
    res
      .status(400)
      .json({
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
  console.log("addItemToCart hit!"); // First line
  console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Request Body (raw):", req.body);
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

// export const addItemToCart = async(req: Request, res: Response, next: NextFunction) =>{
//     try{
//         const userId = req?.user?.id
//         if (!userId) {
//              res.status(401).json({ message: "Unauthorized: user ID missing" });
//              return
//         }
//         const productId = req?.body?.productId
//         const quantity = req?.body?.quantity

//         if (!productId || typeof quantity !== 'number' || quantity <= 0) {
//              res.status(400).json({ message: "Invalid product ID or quantity" });
//              return
//         }

//         const item =await addItemToCartService(userId, productId, quantity)
//         res.status(201).json({item})
//     }catch(err){
//         res.status(400).json({
//             message: 'Could add item to cart',
//             error: err instanceof Error? err.message : "Unknown error"
//         })
//     }
// }
