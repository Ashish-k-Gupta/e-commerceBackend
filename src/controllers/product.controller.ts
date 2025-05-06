import { NextFunction, Request, Response } from "express";
import { addProductService } from "../services/productServices";
import { error } from "console";

export const addProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const userId = req?.user?.id;
        const product = await addProductService(userId, req.body)
        res.status(201).json({ message: 'Product created successfully', product });
    }catch(err){
        res.status(400).json({message: 'Could not add product', error: err instanceof Error ? err.message: 'Unknown error'})
    }
}