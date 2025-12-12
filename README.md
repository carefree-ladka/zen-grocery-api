# Zen Grocery API - Online Grocery Store | Microservices

## Architecture

- **Monorepo**: Turborepo with workspace management
- **Language**: TypeScript with strict typing
- **Architecture**: Clean Architecture with DDD patterns
- **Services**: API Gateway, Product Service, Cart Service
- **Database**: MongoDB Atlas
- **Patterns**: Repository, Service, Controller layers

## Project Structure

```
packages/
├── shared/                 # Shared domain models and utilities
├── api-gateway/           # API Gateway (Port 5000)
├── product-service/       # Product microservice (Port 5001)
└── cart-service/          # Cart microservice (Port 5002)
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Update MongoDB Atlas URI in `.env`

4. Build shared package:
```bash
cd packages/shared && npm run build
```

5. Seed database:
```bash
cd packages/product-service && npm run seed
```

6. Start all services:
```bash
npm run dev
```

## API Endpoints

- **API Gateway**: http://localhost:5000
- **Products**: GET /api/products
- **Cart**: GET|POST /api/cart, DELETE /api/cart/:id
