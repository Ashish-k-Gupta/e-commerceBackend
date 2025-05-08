import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} from "../controllers/address.controller";
import authMiddleware from "../middlewares/authMiddleware";

const addressRouter = Router();
addressRouter.post("/", authMiddleware, createAddress);
addressRouter.get("/", authMiddleware, getAddresses);
addressRouter.get("/:id", authMiddleware, getAddressById);
addressRouter.put("/:id", authMiddleware, updateAddress);
addressRouter.delete("/:id", authMiddleware, deleteAddress);

export default addressRouter;
