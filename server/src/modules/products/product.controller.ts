import { Request, Response } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.ts";

export const productController = {
  list: (req: Request, res: Response) => {
    const products = getProducts();
  },

  create: (req: Request, res: Response) => {
    res.status(201).json({ message: "Create a new product" });
  },

  getById: (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Get product with ID: ${id}` });
  },

  update: (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Update product with ID: ${id}` });
  },

  delete: (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Delete product with ID: ${id}` });
  },
};
