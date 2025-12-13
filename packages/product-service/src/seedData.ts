import { DatabaseConnection, ProductModel } from '@zen-grocery/shared';
import dotenv from 'dotenv';

dotenv.config();

const seedProducts = [
  {
    name: 'Long sleeve Jacket',
    price: 150,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg'
  },
  {
    name: 'Jacket with wollen hat',
    price: 65,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg'
  },
  {
    name: 'Compact fashion t-shirt',
    price: 55.99,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg'
  },
  {
    name: 'Blue jins',
    price: 50,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg'
  },
  {
    name: 'Skirts with full setup',
    price: 695,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg'
  },
  {
    name: 'Yellow Hoody',
    price: 180,
    category: 'men',
    imageUrl:
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
  },
  {
    name: 'Black t-shirt for women',
    price: 20,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg'
  },
  {
    name: 'Gouwn with Red velvet',
    price: 350,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2233703/pexels-photo-2233703.jpeg'
  },
  {
    name: 'Pink beauty',
    price: 100,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg'
  },
  {
    name: "Jean's stylish Jacket",
    price: 245,
    category: 'men',
    imageUrl:
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
  },
  {
    name: 'Jamdani Saree',
    price: 800,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/3363204/pexels-photo-3363204.jpeg'
  },
  {
    name: 'Black Jacket',
    price: 140,
    category: 'men',
    imageUrl: 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg'
  },
  {
    name: 'Black top with jeans',
    price: 120,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/3672825/pexels-photo-3672825.jpeg'
  },
  {
    name: 'Clothes with bag',
    price: 50,
    category: 'kids',
    imageUrl:
      'https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg'
  },
  {
    name: 'Stylish jeans in lightblue',
    price: 100,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2738792/pexels-photo-2738792.jpeg'
  },
  {
    name: 'Unknown horizon',
    price: 350,
    category: 'men',
    imageUrl:
      'https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg'
  },
  {
    name: 'Light tops',
    price: 120,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2010925/pexels-photo-2010925.jpeg'
  },
  {
    name: 'Khakhi jeans',
    price: 190,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/3054973/pexels-photo-3054973.jpeg'
  },
  {
    name: 'Black full sleeve',
    price: 170,
    category: 'women',
    imageUrl:
      'https://images.pexels.com/photos/2693849/pexels-photo-2693849.jpeg'
  },
  {
    name: 'Formal for Men',
    price: 490,
    category: 'men',
    imageUrl:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'
  }
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
