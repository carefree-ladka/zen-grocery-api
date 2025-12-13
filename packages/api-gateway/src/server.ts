import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ServiceDiscovery } from "@zen-grocery/shared";
import { config } from "./config";
import { setupSecurity } from "./middleware/security";
import { discoveryRouter } from "./routes/discovery";

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

// Service discovery
const serviceDiscovery = new ServiceDiscovery();

// Dynamic proxy routes
app.use(
  "/api/products",
  createProxyMiddleware({
    target: config.productServiceUrl,
    changeOrigin: true,
    router: () => serviceDiscovery.discoverService('product-service') || config.productServiceUrl,
  })
);

app.use(
  "/api/cart",
  createProxyMiddleware({
    target: config.cartServiceUrl,
    changeOrigin: true,
    router: () => serviceDiscovery.discoverService('cart-service') || config.cartServiceUrl,
  })
);

// Body parsing after proxy routes
app.use(express.json());

// Discovery routes
app.use('/api/discovery', discoveryRouter);

app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});
