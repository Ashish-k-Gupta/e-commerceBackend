import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createOrderFromCartController, getOrderById, getOrdersForUser, updateOrderStatus } from "../controllers/createOrderFromCartController";

const orderRouter = Router();
orderRouter.get("/", authMiddleware, getOrdersForUser);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.post("/", authMiddleware, createOrderFromCartController);
orderRouter.put("/:id", authMiddleware, updateOrderStatus);

export default orderRouter;