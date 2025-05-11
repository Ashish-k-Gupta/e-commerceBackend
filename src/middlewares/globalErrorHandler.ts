import { Request, Response, NextFunction } from "express";

// Global error handler
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);  // Log the error for debugging purposes
  const statusCode = err.statusCode || 500;  // Default to 500 for internal server errors
  const message = err.message || "Internal Server Error";  // Default message
  res.status(statusCode).json({ message });
};
