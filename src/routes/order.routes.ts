import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createOrderFromCartController } from "../controllers/createOrderFromCartController";

const orderRouter = Router();
orderRouter.post("/", authMiddleware, createOrderFromCartController);

export default orderRouter;