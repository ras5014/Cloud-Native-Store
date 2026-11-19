import { z } from "zod";
import { selectOrderItemSchema, selectOrderSchema } from "../../db/schema.ts";

export const orderWithItemsSchema = selectOrderSchema.extend({
  items: z.array(selectOrderItemSchema),
});

export const orderParamSchema = z.object({
  id: z.uuid(),
});
