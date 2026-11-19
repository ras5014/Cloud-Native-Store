import { Router } from "express";
import { orderController as controller } from "./order.controller.ts";
import { validateBody, validateParams } from "../../middlewares/validation.ts";
import { insertOrderSchema } from "../../db/schema.ts";
import { orderParamSchema } from "./order.schema.ts";

const router = Router();

router.get("/", controller.list);
router.post("/", validateBody(insertOrderSchema), controller.create);
router.get("/:id", validateParams(orderParamSchema), controller.getById);
router.post("/:id/cancel", validateParams(orderParamSchema), controller.cancel);

export default router;
