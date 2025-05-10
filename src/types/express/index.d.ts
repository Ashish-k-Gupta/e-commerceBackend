import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

import { Order } from "../../entities/orderEntity";
import { Product } from "../../entities/productEntity";


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



export type OrderListResponse = {
    orders: Order[];
    totalOrders: number;
    totalPages: number;
}

export type GetOrdersParams = {
  page: number;
  pageSize: number;
  filters?:{
    status?: string;
    userId?: string;
    dateFrom?:Date;
    dateTo?: Date;
  };
  sortBy?: 'createdAt' | 'totalAmount';
  sortOrder?: 'ASC' | 'DESC'
};

export type GetProductParams = {
  page: number;
  pageSize: number;
  filters?:{
    name?: string;
    // stock?: string;
  };
  sortBy?: 'price' | 'name';
  sortOrder?: 'ASC' | 'DESC'
}

export type ProductListResponse ={
  product: Product[];
  totalProduct: number;
  totalPages: number;
}