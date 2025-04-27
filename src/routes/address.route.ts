import { Router } from "express";
import { createAddress, deleteAddress, getAddresses } from "../controllers/address.controller";
import authMiddleware from "../middlewares/authMiddleware";


const addressRouter = Router();
addressRouter.post("/", authMiddleware, createAddress);
addressRouter.get("/", authMiddleware, getAddresses);
addressRouter.delete("/:id", authMiddleware, deleteAddress);

export default addressRouter;