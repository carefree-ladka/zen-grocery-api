import mongoose, { Document, Schema } from 'mongoose';
import { Product as IProduct } from '../types';

export interface ProductDocument extends Omit<IProduct, 'id'>, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>(
  'Product',
  productSchema
);
