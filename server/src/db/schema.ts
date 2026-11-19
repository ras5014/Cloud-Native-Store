import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
  check,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";

import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

// Products
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    price: numeric("price", {
      precision: 10,
      scale: 2,
      mode: "number",
    }).notNull(),
    category: varchar("category", { length: 60 }).notNull(),
    stock: integer("stock").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  // This makes the database reject inserts or updates with a non-positive price or stock
  (table) => [
    check("products_price_non_negetive", sql`${table.price} >= 0`),
    check("products_stock_non_negetive", sql`${table.stock} >= 0`),
  ],
);

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const updateProductSchema = createUpdateSchema(products);

// Orders
export const orderStatusEnum = pgEnum("order_status", ["placed", "cancelled"]);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerName: varchar("customer_name", { length: 120 }).notNull(),
    customerEmail: varchar("customer_email", { length: 254 }).notNull(),
    status: orderStatusEnum("status").notNull().default("placed"),
    total: numeric("total", {
      precision: 12,
      scale: 2,
      mode: "number",
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [check("orders_total_non_negetive", sql`${table.total} >= 0`)],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    productName: varchar("product_name", { length: 120 }).notNull(),
    unitPrice: numeric("unit_price", {
      precision: 10,
      scale: 2,
      mode: "number",
    }).notNull(),
    quantity: integer("quantity").notNull(),
    lineTotal: numeric("line_total", {
      precision: 12,
      scale: 2,
      mode: "number",
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    check("order_items_quantity_positive", sql`${table.quantity} > 0`),
    check("order_item_unit_price_non_negetive", sql`${table.unitPrice} >= 0`),
    check("order_items_line_total_non_negative", sql`${table.lineTotal} >= 0`),
    unique("order_items_order_product_unique").on(
      table.orderId,
      table.productId,
    ),
  ],
);

export const insertOrderSchema = createInsertSchema(orders);
export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const selectOrderItemSchema = createSelectSchema(orderItems);
