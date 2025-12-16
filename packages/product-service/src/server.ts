import { CacheService, DatabaseConnection, ServiceDiscovery } from '@zen-grocery/shared';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { ProductController } from './controllers/ProductController';
import { ProductRepository } from './repositories/ProductRepository';
import { ProductService } from './services/ProductService';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;

app.use(cors());
app.use(express.json());

// Rate limiting
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200 // 200 requests per minute per IP
}));

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
    // Try to connect to database, but don't fail if it's not available
    try {
      await DatabaseConnection.connect(process.env.MONGODB_URI!);
      console.log('Connected to MongoDB');
    } catch (dbError) {
      console.warn('MongoDB connection failed, continuing without database:', (dbError as Error).message);
    }
    
    // Try to connect to Redis, but don't fail if it's not available
    try {
      await CacheService.connect(process.env.REDIS_URL);
    } catch (redisError) {
      console.warn('Redis connection failed, continuing without cache:', (redisError as Error).message);
    }
    
    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
      
      // Register with service discovery
      const serviceDiscovery = new ServiceDiscovery();
      serviceDiscovery.registerService('product-service', 'localhost', Number(PORT));
    });
  } catch (error) {
    console.error('Failed to start Product Service:', error);
    process.exit(1);
  }
};

start();
