import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  constructor(private productService: ProductService) {}

  async getProducts(req: Request, res: Response): Promise<void> {
    const result = await this.productService.getAllProducts();

    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  }
}
