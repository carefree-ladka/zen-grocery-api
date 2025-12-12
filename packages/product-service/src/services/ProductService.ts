import { ApiResponse, Product, CacheService } from '@zen-grocery/shared';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    try {
      // Check cache first
      const cached = await CacheService.get('products:all');
      if (cached) {
        return {
          success: true,
          data: JSON.parse(cached)
        };
      }

      // Fetch from database
      const products = await this.productRepository.findAll();
      const productData = products.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        price: p.price,
        category: p.category,
        imageUrl: p.imageUrl
      }));

      // Cache for 5 minutes
      await CacheService.set('products:all', JSON.stringify(productData), 300);

      return {
        success: true,
        data: productData
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products'
      };
    }
  }
}
