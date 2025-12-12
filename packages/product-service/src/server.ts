import { CacheService, DatabaseConnection } from '@zen-grocery/shared';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ProductController } from './controllers/ProductController';
import { ProductRepository } from './repositories/ProductRepository';
import { ProductService } from './services/ProductService';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;

app.use(cors());
app.use(express.json());

// Dependency injection
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Routes
app.get('/api/products', (req, res) => productController.getProducts(req, res));

app.get('/health', (req, res) => {
  res.json({ status: 'Product Service is running', port: PORT });
});

const start = async () => {
  try {
    await DatabaseConnection.connect(process.env.MONGODB_URI!);
    
    // Try to connect to Redis, but don't fail if it's not available
    try {
      console.log('Connecting to Redis:', process.env.REDIS_URL);
      await CacheService.connect(process.env.REDIS_URL);
    } catch (redisError) {
      console.warn('Redis connection failed, continuing without cache:', (redisError as Error).message);
    }
    
    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Product Service:', error);
    process.exit(1);
  }
};

start();
