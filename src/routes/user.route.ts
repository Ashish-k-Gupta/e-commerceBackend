import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createUser, deleteUser, getUserDetails, getUserList, updateUserDetails } from "../controllers/user.controller";

const userRouter = Router()
userRouter.get('/api/user', authMiddleware, getUserList)
userRouter.post('/api/user', authMiddleware, createUser);
userRouter.get('/api/user/:id', authMiddleware, getUserDetails);
userRouter.put('/api/user/:id', authMiddleware, updateUserDetails)
userRouter.delete('/api/user/:id', authMiddleware, deleteUser)


 export default userRouter;