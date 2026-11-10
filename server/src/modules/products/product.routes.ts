import { Router } from "express";
import { productController as controller } from "./product.controller.ts";
import { validateBody, validateParams } from "../../middlewares/validation.ts";
import { insertProductSchema, updateProductSchema } from "../../db/schema.ts";
import { productParamSchema } from "./product.schema.ts";

const router = Router();

router.get("/", controller.list);
router.post("/", validateBody(insertProductSchema), controller.create);
router.get("/:id", validateParams(productParamSchema), controller.getById);
router.put(
  "/:id",
  validateParams(productParamSchema),
  validateBody(updateProductSchema),
  controller.update,
);
router.delete("/:id", validateParams(productParamSchema), controller.delete);

export default router;
