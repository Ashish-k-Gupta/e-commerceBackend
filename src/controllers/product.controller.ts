import { NextFunction, Request, Response } from "express";
import {
  addProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from "../services/productServices";
import { error } from "console";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.user?.id;
    const product = await addProductService(userId, req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({
      message: "Could not add product",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allProducts = await getProductService();
    res.status(200).json({ allProducts });
  } catch (err) {
    res.status(400).json({
      message: "Could fetch the request",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req?.params?.id;
    await deleteProductService(productId);
    res
      .status(200)
      .json({ message: `Product with ${productId} deleted successfully` });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete product",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req?.params?.id;
    const payloadBody = req.body;
    const updateProduct = await updateProductService(productId, payloadBody);
    res.status(200).json({
      message: "Product updated successfully",
      product: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to udpated product",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
