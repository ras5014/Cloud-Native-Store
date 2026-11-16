import type { Request, Response } from "express";
import {
  getOrders,
  getOrdersById,
  createOrder,
  cancelOrder,
} from "./order.service.ts";
import { successResponse } from "../../utils/responses.ts";

export const orderController = {
  list: async (req: Request, res: Response) => {
    const orders = await getOrders();
    successResponse(res, orders, 200, "Orders retrived successfully");
  },

  create: async (req: Request, res: Response) => {
    const order = await createOrder(req.body);
    successResponse(res, order, 201, "Order created successfully");
  },

  getById: async (req: Request, res: Response) => {
    const order = await getOrdersById(req.params.id as string);
    successResponse(res, order, 200, "Order retrieved successfully");
  },

  cancel: async (req: Request, res: Response) => {
    const order = await cancelOrder(req.params.id as string);
    successResponse(res, order, 200, "Order cancelled successfully");
  },
};
