import { desc, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import {
  products,
  selectProductSchema,
  insertProductSchema,
  updateProductSchema,
} from "../../db/schema.ts";
import { z } from "zod";
import { AppError } from "../../middlewares/errorHandler.ts";

export const getProducts = async (): Promise<
  z.infer<typeof selectProductSchema>[]
> => {
  return await db.select().from(products).orderBy(desc(products.createdAt));
};

export const createProduct = async (
  input: z.infer<typeof insertProductSchema>,
): Promise<z.infer<typeof selectProductSchema>> => {
  // Mutations (insert, update, delete) use returning() to fetch changed rows; select queries return rows directly.
  const [productsCreated] = await db.insert(products).values(input).returning();
  if (!productsCreated) {
    throw new AppError(500, "Failed to create product");
  }
  return productsCreated;
};

export const getProductById = async (
  id: string,
): Promise<z.infer<typeof selectProductSchema>> => {
  const [product] = await db.select().from(products).where(eq(products.id, id));
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  return product;
};

// TODO: Update the updatedAt time
export const updateProduct = async (
  id: string,
  input: z.infer<typeof updateProductSchema>,
): Promise<z.infer<typeof selectProductSchema>> => {
  const [productUpdated] = await db
    .update(products)
    .set(input)
    .where(eq(products.id, id))
    .returning();
  if (!productUpdated) {
    throw new AppError(404, "Product not found");
  }
  return productUpdated;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning({ id: products.id });

  if (!deletedProduct) {
    throw new AppError(404, "Product not found");
  }
};
