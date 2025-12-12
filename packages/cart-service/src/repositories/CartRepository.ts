import { CartDocument, CartItem, CartModel } from '@zen-grocery/shared';

export class CartRepository {
  async findAll(): Promise<CartDocument[]> {
    return CartModel.find();
  }

  async findByProductId(productId: string): Promise<CartDocument | null> {
    return CartModel.findOne({ productId });
  }

  async create(cartItem: CartItem): Promise<CartDocument> {
    return CartModel.create(cartItem);
  }

  async updateQuantity(
    productId: string,
    quantity: number
  ): Promise<CartDocument | null> {
    return CartModel.findOneAndUpdate(
      { productId },
      { quantity },
      { new: true }
    );
  }

  async deleteByProductId(productId: string): Promise<void> {
    await CartModel.deleteOne({ productId });
  }

  async count(): Promise<number> {
    return CartModel.countDocuments();
  }
}
