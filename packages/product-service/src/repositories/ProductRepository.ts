import { Product, ProductDocument, ProductModel } from '@zen-grocery/shared';

export class ProductRepository {
  async findAll(): Promise<ProductDocument[]> {
    return ProductModel.find();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return ProductModel.findById(id);
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    return ProductModel.find({ category });
  }

  async create(product: Omit<Product, 'id'>): Promise<ProductDocument> {
    return ProductModel.create(product);
  }
}
