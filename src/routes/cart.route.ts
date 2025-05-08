import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { addItemToCart, getOrCreateCart } from "../controllers/cart.controller";

const cartRouter = Router();
cartRouter.get("/", authMiddleware, getOrCreateCart);
cartRouter.post("/", authMiddleware, addItemToCart);

export default cartRouter;
