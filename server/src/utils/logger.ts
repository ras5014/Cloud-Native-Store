import pino from "pino";
import { env } from "../config/env.ts";

export const logger = pino({
  level: env.LOG_LEVEL,

  base: {
    service: "cloud-native-store-api",
    environment: env.NODE_ENV,
  },

  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "*.password",
    "*.token",
  ],

  ...(env.NODE_ENV === "development" && process.stdout.isTTY
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: true,
          },
        },
      }
    : {}),
});
