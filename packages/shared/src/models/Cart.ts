import mongoose, { Document, Schema } from 'mongoose';
import { CartItem as ICartItem } from '../types';

export interface CartDocument extends ICartItem, Document {}

const cartSchema = new Schema<CartDocument>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
  },
  { timestamps: true }
);

export const CartModel = mongoose.model<CartDocument>('Cart', cartSchema);
