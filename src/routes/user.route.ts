import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { deleteUser, getUserDetails, getUserList, updateUserDetails } from "../controllers/user.controller";

const userRouter = Router()
userRouter.get('/api/user/:id', (req, res, next) => {
    console.log('Route hit: /api/user/:userId', req.params.userId); // Log the userId
    next(); // Pass control to the next handler (getUserById)
  }, authMiddleware, getUserDetails);

userRouter.get('/api/user', authMiddleware, getUserList)
userRouter.put('/api/user/:id', authMiddleware, updateUserDetails)
userRouter.delete('/api/user/:id', authMiddleware, deleteUser)


 export default userRouter;