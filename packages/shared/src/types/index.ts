export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export enum Category {
  FRUITS = 'Fruits',
  VEGETABLES = 'Vegetables',
  DAIRY = 'Dairy',
  SNACKS = 'Snacks'
}
