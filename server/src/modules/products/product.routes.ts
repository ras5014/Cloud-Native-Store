import { Router } from "express";
import { productController as controller } from "./product.controller.ts";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
