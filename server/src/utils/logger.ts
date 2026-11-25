import pino from "pino";
import { env } from "../config/env.ts";

/**
 * Logger configuration using Pino logging library.
 *
 * This logger is configured to:
 * - Log at the appropriate level based on environment (DEBUG, INFO, WARN, ERROR)
 * - Include service name and environment in every log entry for easy identification
 * - Automatically redact sensitive data like auth headers, cookies, passwords, and tokens
 * - Use pino-pretty transport in development for colored, human-readable output
 */
export const logger = pino({
  // Set the minimum log level. Logs below this level will be ignored.
  // Common values: 'trace', 'debug', 'info', 'warn', 'error', 'fatal'
  level: env.LOG_LEVEL,

  // Base object included in every log entry for easy identification and filtering
  base: {
    service: "cloud-native-store-api", // Unique identifier for this microservice
    environment: env.NODE_ENV, // Current environment (development/production)
  },

  // Automatically redact sensitive fields from logs to prevent data leakage
  // This prevents accidentally logging credentials, tokens, or personal information
  redact: [
    "req.headers.authorization", // Redact Authorization header (contains API keys/tokens)
    "req.headers.cookie", // Redact Cookie headers (may contain session tokens)
    "*.password", // Redact any field containing 'password' in its name
    "*.token", // Redact any field containing 'token' in its name
  ],

  // Development-only configuration for human-readable, colored output
  // This transport is only applied when running in development mode with a TTY attached
  ...(env.NODE_ENV === "development" && process.stdout.isTTY
    ? {
        transport: {
          target: "pino-pretty", // Use pino-pretty for pretty-printed logs
          options: {
            colorize: true, // Add colors to make different log levels stand out
            translateTime: true, // Convert timestamps to human-readable format (e.g., '12:34:56')
          },
        },
      }
    : {}), // Empty object in production or non-TTY environments
});
