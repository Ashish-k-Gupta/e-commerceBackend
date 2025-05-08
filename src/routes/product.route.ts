import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/authMiddleware";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller";

const productRouter = Router()
productRouter.post('/', authMiddleware, isAdmin, addProduct)
productRouter.get('/', authMiddleware, getProducts)
productRouter.delete('/:id', authMiddleware, isAdmin, deleteProduct)
productRouter.put('/:id', authMiddleware, isAdmin, updateProduct)

export default productRouter;