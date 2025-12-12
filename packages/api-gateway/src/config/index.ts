export const config = {
  port: process.env.PORT ?? 5000,
  productServiceUrl: process.env.PRODUCT_SERVICE_URL ?? 'http://localhost:5001',
  cartServiceUrl: process.env.CART_SERVICE_URL ?? 'http://localhost:5002',
  nodeEnv: process.env.NODE_ENV ?? 'development'
};
