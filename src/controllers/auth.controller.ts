import { Request, Response, NextFunction } from "express";
import { loginUserService } from "../services/authService";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await loginUserService(req.body);
    res.status(200).json({ message: "Login successfully", token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(401).json({ message: "Login failed", error: "Unknown error" });
    }
  }
};
