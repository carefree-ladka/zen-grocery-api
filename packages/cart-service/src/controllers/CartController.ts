import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
  constructor(private cartService: CartService) {}

  async getCart(req: Request, res: Response): Promise<void> {
    const result = await this.cartService.getCartItems();

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    const { productId, quantity } = req.body;
    const result = await this.cartService.addToCart({ productId, quantity });

    if (result.success) {
      res.status(201).json(result.data);
    } else {
      const status = result.error === 'Cart limit exceeded' ? 400 : 500;
      res.status(status).json({ error: result.error });
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.cartService.removeFromCart(id);

    if (result.success) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: result.error });
    }
  }
}
