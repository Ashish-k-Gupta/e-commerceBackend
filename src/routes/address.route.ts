import { Router } from "express";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/address.controller";
import authMiddleware from "../middlewares/authMiddleware";


const addressRouter = Router();
addressRouter.post("/", authMiddleware, createAddress);
addressRouter.get("/", authMiddleware, getAddresses);
addressRouter.put("/:id", authMiddleware, updateAddress);
addressRouter.delete("/:id", authMiddleware, deleteAddress);

export default addressRouter;