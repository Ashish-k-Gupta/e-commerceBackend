import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  addItemToCart,
  getOrCreateCart,
  updatedCartItemQuanity,
} from "../controllers/cart.controller";

const cartRouter = Router();
cartRouter.get("/", authMiddleware, getOrCreateCart);
cartRouter.post("/", authMiddleware, addItemToCart);
cartRouter.put("/", authMiddleware, updatedCartItemQuanity);

export default cartRouter;
