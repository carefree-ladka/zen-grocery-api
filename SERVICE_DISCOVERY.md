# Service Discovery Implementation

## Overview
Added simple in-memory service discovery to the microservices architecture.

## Components

### ServiceRegistry
- Manages service instances with health monitoring
- Automatic cleanup of unhealthy services (30s timeout)
- Singleton pattern for shared state

### ServiceDiscovery
- Client for service registration and discovery
- Heartbeat mechanism (10s intervals)
- Health checking capabilities

## Usage

### Services Auto-Register
- Product Service: `product-service` on port 5001
- Cart Service: `cart-service` on port 5002

### API Gateway Discovery
- Dynamic routing based on discovered services
- Fallback to static URLs if discovery fails

### Discovery Endpoints
- `GET /api/discovery/services` - List all services
- `GET /api/discovery/services/health` - Health status

## Testing
```bash
# Start all services
npm run dev

# Test discovery (in another terminal)
node test-service-discovery.js
```

## Benefits
- Dynamic service routing
- Health monitoring
- Service registry visibility
- Graceful fallback to static configuration