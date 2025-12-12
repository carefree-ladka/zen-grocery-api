import { CartRepository } from '../repositories/CartRepository';
import { CartItem, ApiResponse } from '@zen-grocery/shared';

export class CartService {
  private readonly MAX_CART_ITEMS = 10;

  constructor(private cartRepository: CartRepository) {}

  async getCartItems(): Promise<ApiResponse<CartItem[]>> {
    try {
      const items = await this.cartRepository.findAll();
      return {
        success: true,
        data: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch cart items' };
    }
  }

  async addToCart(cartItem: CartItem): Promise<ApiResponse<CartItem>> {
    try {
      const cartCount = await this.cartRepository.count();
      if (cartCount >= this.MAX_CART_ITEMS) {
        return { success: false, error: 'Cart limit exceeded' };
      }

      const existingItem = await this.cartRepository.findByProductId(
        cartItem.productId
      );

      if (existingItem) {
        const updated = await this.cartRepository.updateQuantity(
          cartItem.productId,
          existingItem.quantity + cartItem.quantity
        );
        return {
          success: true,
          data: { productId: updated!.productId, quantity: updated!.quantity }
        };
      }

      const newItem = await this.cartRepository.create(cartItem);
      return {
        success: true,
        data: { productId: newItem.productId, quantity: newItem.quantity }
      };
    } catch (error) {
      return { success: false, error: 'Failed to add item to cart' };
    }
  }

  async removeFromCart(productId: string): Promise<ApiResponse<void>> {
    try {
      await this.cartRepository.deleteByProductId(productId);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to remove item from cart' };
    }
  }
}
