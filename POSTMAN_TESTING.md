# Postman API Testing Guide

## Base URL
All requests go through API Gateway: `http://localhost:5000`

## 1. Health Check APIs

### API Gateway Health
- **Method**: GET
- **URL**: `http://localhost:5000/health`
- **Expected Response**:
```json
{
  "status": "API Gateway is running",
  "port": 5000
}
```

## 2. Product APIs

### Get All Products
- **Method**: GET
- **URL**: `http://localhost:5000/api/products`
- **Expected Response**:
```json
[
  {
    "id": "64fabc123",
    "name": "Apple",
    "price": 120,
    "category": "Fruits",
    "imageUrl": "https://example.com/apple.jpg"
  },
  {
    "id": "64fabc124",
    "name": "Banana", 
    "price": 80,
    "category": "Fruits",
    "imageUrl": "https://example.com/banana.jpg"
  }
]
```

## 3. Cart APIs

### Get Cart Items
- **Method**: GET
- **URL**: `http://localhost:5000/api/cart`
- **Expected Response**:
```json
[
  {
    "productId": "64fabc123",
    "quantity": 2
  }
]
```

### Add Item to Cart
- **Method**: POST
- **URL**: `http://localhost:5000/api/cart`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "productId": "64fabc123",
  "quantity": 1
}
```
- **Expected Response**:
```json
{
  "productId": "64fabc123",
  "quantity": 1
}
```

### Remove Item from Cart
- **Method**: DELETE
- **URL**: `http://localhost:5000/api/cart/{productId}`
- **Example**: `http://localhost:5000/api/cart/64fabc123`
- **Expected Response**: 204 No Content

## 4. Error Scenarios

### Cart Limit Exceeded
- **Method**: POST
- **URL**: `http://localhost:5000/api/cart`
- **Body**: Add 11th item
- **Expected Response** (400):
```json
{
  "error": "Cart limit exceeded"
}
```

## 5. Direct Service Testing (Optional)

### Product Service Direct
- **URL**: `http://localhost:5001/api/products`

### Cart Service Direct  
- **URL**: `http://localhost:5002/api/cart`

## Setup Steps
1. Start services: `npm run dev`
2. Verify all services are running
3. Import this collection into Postman
4. Test each endpoint sequentially