import jwt from "jsonwebtoken";
import {Request, Response, NextFunction } from "express";
import { jwtUtils } from "../utils/jwt.utils";

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: "No token provided"})
        return;
    }
        const token = authHeader.split(' ')[1]

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY!)as {
                userId: string;
                role: string;
            };

            req.user ={
                id: decode.userId,
                role: decode.role
            }


            // const payload = jwtUtils.verifyToken(token);
            // (req as any).user = payload;
            next();
        }catch(err){
            res.status(401).json({message: 'Invalid token'})
            return
        }
}

export default authMiddleware;