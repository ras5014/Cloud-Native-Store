import type { Request, Response } from "express";
import { type ZodType } from "zod"; // ZodSchema is now ZodType

/**
 * This middleware validates the request body against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response) => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
  };
};

/**
 * This middleware validates the request parameters against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response) => {
    schema.parse(req.params);
  };
};

/**
 * This middleware validates the request query parameters against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response) => {
    schema.parse(req.query);
  };
};
