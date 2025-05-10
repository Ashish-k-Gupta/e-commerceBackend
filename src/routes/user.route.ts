import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUserList,
  updateUserDetails,
} from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin";

const userRouter = Router();
userRouter.get("/api/user", authMiddleware, isAdmin, getUserList);
userRouter.post("/api/user", authMiddleware, createUser);
userRouter.get("/api/user/:id", authMiddleware, getUserDetails);
userRouter.put("/api/user/:id", authMiddleware, isAdmin, updateUserDetails);
userRouter.delete("/api/user/:id", authMiddleware,isAdmin, deleteUser);

export default userRouter;
