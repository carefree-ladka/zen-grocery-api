import { DatabaseConnection, ProductModel } from '@zen-grocery/shared';
import dotenv from 'dotenv';

dotenv.config();

const seedProducts = [
  { name: 'Organic Apples', price: 109.95, category: 'Fruits', imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
  { name: 'Premium Bananas', price: 22.30, category: 'Fruits', imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg' },
  { name: 'Fresh Carrots', price: 55.99, category: 'Vegetables', imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
  { name: 'Whole Milk', price: 15.99, category: 'Dairy', imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' },
  { name: 'Potato Chips', price: 6.95, category: 'Snacks', imageUrl: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
  { name: 'Greek Yogurt', price: 16.80, category: 'Dairy', imageUrl: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg' },
  { name: 'Cheese Slices', price: 9.99, category: 'Dairy', imageUrl: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg' },
  { name: 'Mixed Nuts', price: 10.99, category: 'Snacks', imageUrl: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg' },
  { name: 'Orange Juice', price: 6.40, category: 'Beverages', imageUrl: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg' },
  { name: 'Energy Drink', price: 10.90, category: 'Beverages', imageUrl: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg' },
  { name: 'Protein Bars', price: 10.90, category: 'Snacks', imageUrl: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg' },
  { name: 'Breakfast Cereal', price: 11.40, category: 'Breakfast', imageUrl: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg' },
  { name: 'Bread Loaf', price: 5.99, category: 'Bakery', imageUrl: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
  { name: 'Pasta Pack', price: 9.99, category: 'Pantry', imageUrl: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg' },
  { name: 'Frozen Pizza', price: 5.69, category: 'Frozen', imageUrl: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg' },
  { name: 'Ice Cream', price: 2.99, category: 'Frozen', imageUrl: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg' },
  { name: 'Fresh Spinach', price: 3.99, category: 'Vegetables', imageUrl: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg' },
  { name: 'Tomatoes', price: 9.85, category: 'Vegetables', imageUrl: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg' },
  { name: 'Bell Peppers', price: 7.95, category: 'Vegetables', imageUrl: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg' },
  { name: 'Strawberries', price: 12.99, category: 'Fruits', imageUrl: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg' }
];

(async () => {
  try {
    await DatabaseConnection.connect(process.env.MONGODB_URI!);
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(seedProducts);
    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
})();
