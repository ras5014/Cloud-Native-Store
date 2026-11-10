import { Request, Response } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.ts";
import { successResponse } from "../../utils/responses.ts";

export const productController = {
  list: async (req: Request, res: Response) => {
    const products = await getProducts();
    successResponse(res, products, 200, "Products retrieved successfully");
  },

  create: async (req: Request, res: Response) => {
    const input = req.body;
    const product = await createProduct(input);
    successResponse(res, product, 201, "Product created successfully");
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id as string);
    successResponse(res, product, 200, "Product retrieved successfully");
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await updateProduct(id as string, req.body);
    successResponse(res, product, 200, "Product updated successfully");
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProduct(id as string);
    successResponse(res, null, 200, "Product deleted successfully");
  },
};
