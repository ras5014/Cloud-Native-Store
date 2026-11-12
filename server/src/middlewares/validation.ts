import type { Request, Response, NextFunction } from "express";
import { type ZodType } from "zod"; // ZodSchema is now ZodType

/**
 * This middleware validates the request body against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  };
};

/**
 * This middleware validates the request parameters against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.params);
    next();
  };
};

/**
 * This middleware validates the request query parameters against a provided schema using Zod.
 * It can be used to ensure that incoming requests contain the expected data structure and types.
 */
export const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.query);
    next();
  };
};
