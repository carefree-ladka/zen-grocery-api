import { DatabaseConnection } from '@zen-grocery/shared';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { CartController } from './controllers/CartController';
import { CartRepository } from './repositories/CartRepository';
import { CartService } from './services/CartService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Dependency injection
const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

// Routes
app.get('/api/cart', (req, res) => cartController.getCart(req, res));
app.post('/api/cart', (req, res) => cartController.addToCart(req, res));
app.delete('/api/cart/:id', (req, res) => cartController.removeFromCart(req, res));

app.get('/health', (req, res) => {
  res.json({ status: 'Cart Service is running', port: PORT });
});

const start = async () => {
  try {
    await DatabaseConnection.connect(process.env.MONGODB_URI!);
    app.listen(PORT, () => {
      console.log(`Cart Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Cart Service:', error);
    process.exit(1);
  }
};

start();
