import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.ts";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "product-service" });
});

app.use(
  "/api/products",
  (await import("./modules/products/product.routes.ts")).default,
);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
