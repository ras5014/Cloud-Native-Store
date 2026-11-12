import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URI: z
    .string()
    .refine(
      (uri) => uri.startsWith("postgres://") || uri.startsWith("postgresql://"),
      { error: "DATABASE_URI must start with postgres:// or postgresql://" },
    ),
});

export const env = envSchema.parse(process.env);
