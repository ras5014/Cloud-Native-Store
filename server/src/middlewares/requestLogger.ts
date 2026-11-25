import { randomUUID } from "node:crypto";
import { pinoHttp } from "pino-http";
import { logger } from "../utils/logger.ts";

export const requestLogger = pinoHttp({
  logger,

  genReqId: (req, res) => {
    const incomingId = req.headers["x-request-id"];

    const id =
      typeof incomingId === "string" && incomingId.length <= 100
        ? incomingId
        : randomUUID();

    res.setHeader("X-Request-Id", id);

    return id;
  },

  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url?.split("?")[0],
    }),

    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
