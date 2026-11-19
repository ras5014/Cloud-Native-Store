import { db } from "../../db/connection.ts";
import {
  selectOrderSchema,
  orders,
  orderItems,
  insertOrderSchema,
} from "../../db/schema.ts";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { AppError } from "../../middlewares/errorHandler.ts";
import { orderWithItemsSchema } from "./order.schema.ts";

export const getOrders = async (): Promise<
  z.infer<typeof selectOrderSchema>[]
> => {
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
};

export const getOrdersById = async (
  id: string,
): Promise<z.infer<typeof orderWithItemsSchema>> => {
  const [order] = await db.select().from(orders).where(eq(orders.id, id));

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, id));
  return { ...order, items };
};

export const createOrder = async (
  input: z.infer<typeof insertOrderSchema>,
): Promise<z.infer<typeof selectOrderSchema>> => {
  //TODO: In future We can add transactions
  const [order] = await db.insert(orders).values(input).returning();

  if (!order) {
    throw new AppError(500, "Error creating order");
  }
  return order;
};

export const cancelOrder = async (
  id: string,
): Promise<z.infer<typeof selectOrderSchema>> => {
  const [canceledOrder] = await db
    .update(orders)
    .set({ status: "cancelled" })
    .where(eq(orders.id, id))
    .returning();

  if (!canceledOrder) {
    throw new AppError(404, "Order not found");
  }

  return canceledOrder;
};
