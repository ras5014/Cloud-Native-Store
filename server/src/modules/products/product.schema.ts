import { z } from "zod";

export const productParamSchema = z.object({
  id: z.uuid(),
});
