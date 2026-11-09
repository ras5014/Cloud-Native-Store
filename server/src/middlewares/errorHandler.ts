import { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { env } from "../config/env.ts";

/**
 * Custom error class for application-specific errors.
 * AppError is a specialized error class that extends the built-in Error class.
 * It adds statusCode, message and name properties to the error object
 * Usage: throw new AppError(404, "Product not found");
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message); // By this message property will be added to error object
    this.name = "AppError"; // By this name property will be added to error object
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  res.status(500).json({
    error: "Internal server error",
  });
};

export const notFoundHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError(404, `Not found - ${req.originalUrl}`));
};
