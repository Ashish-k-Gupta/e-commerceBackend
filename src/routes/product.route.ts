import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/authMiddleware";
import { addProduct } from "../controllers/product.controller";

const productRouter = Router()
productRouter.post('/', authMiddleware, isAdmin, addProduct)

export default productRouter;