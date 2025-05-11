import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  deleteUserService,
  getUserDetailService,
  getUserListService,
  updateUserDetailService,
} from "../services/userService";
import { error } from "console";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(404).json({ message: "User not found" });
    }
    const user = await getUserDetailService(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      message: "User not Found",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userList = await getUserListService();
    res.status(200).json(userList);
  } catch (err) {
    res.status(400).json({
      message: "No user found",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.user!.id;
    const updatedUserDetail = await updateUserDetailService(userId, req.body);
    res.status(200).json({
      message: "User updated successfully",
      updatedUser: updatedUserDetail,
    });
  } catch (err) {
    res.status(400).json({
      message: "User not found",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.params?.id;
    const deleteUser = deleteUserService(userId);
    res
      .status(200)
      .json({ message: "User deleted succesfully", deletedUser: deleteUser });
  } catch (err) {
    res.status(400).json({
      message: "User not found",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
