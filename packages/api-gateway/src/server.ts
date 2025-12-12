import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config";
import { setupSecurity } from "./middleware/security";

dotenv.config();

const app = express();

// Security middleware
setupSecurity(app);

// Basic middleware
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running", port: config.port });
});

// Proxy routes - must come before body parsing
app.use(
  "/api/products",
  createProxyMiddleware({
    target: config.productServiceUrl,
    changeOrigin: true,
  })
);

app.use(
  "/api/cart",
  createProxyMiddleware({
    target: config.cartServiceUrl,
    changeOrigin: true,
  })
);

// Body parsing after proxy routes
app.use(express.json());

app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});
