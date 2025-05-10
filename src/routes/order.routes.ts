import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createOrderFromCartController, deleteOrder, getAllOrder, getOrderById, getOrdersForUser, updateOrderStatus } from "../controllers/createOrderFromCartController";
import { isAdmin } from "../middlewares/isAdmin";

const orderRouter = Router();
orderRouter.get("/", authMiddleware, getOrdersForUser);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.get("/:id", authMiddleware,isAdmin, getAllOrder);
orderRouter.post("/", authMiddleware, createOrderFromCartController);
orderRouter.put("/:id", authMiddleware, updateOrderStatus);
orderRouter.delete("/:id", authMiddleware, deleteOrder);

export default orderRouter;