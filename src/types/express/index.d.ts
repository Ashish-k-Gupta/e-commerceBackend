import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
