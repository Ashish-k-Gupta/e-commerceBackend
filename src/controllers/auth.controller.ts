import { Request, Response, NextFunction } from "express";
import { loginUserService, registerUserService } from "../services/authService"


export const registerUser = async (req: Request, res: Response) =>{
    try {
        const user = await registerUserService(req.body)
        res.status(201).json({ message: 'User registered successfully', user });
    }catch(err){
        res.status(400).json({ message: 'Registration failed', err});
    }
}


export const loginUser = async (req: Request, res: Response) =>{
    try{
        const token = await loginUserService(req.body)
        res.status(200).json({ message: 'Login successfully', token});

    }catch(err){
        if(err instanceof Error){
            res.status(400).json({ message: err.message});
        }else{
            res.status(401).json({ message: 'Login failed', error: 'Unknown error' });
        }
    }
}