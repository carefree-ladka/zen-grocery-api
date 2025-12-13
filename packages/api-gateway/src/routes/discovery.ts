import { ServiceRegistry } from '@zen-grocery/shared';
import { Router } from 'express';

const router = Router();
const registry = ServiceRegistry.getInstance();

// Get all registered services
router.get('/services', (req, res) => {
  const services = registry.getAllServices();
  res.json({ services });
});

// Service health endpoint
router.get('/services/health', (req, res) => {
  const services = registry.getAllServices();
  const healthStatus = services.map(service => ({
    name: service.name,
    status: 'healthy',
    lastHeartbeat: service.lastHeartbeat
  }));

  res.json({ health: healthStatus });
});

export { router as discoveryRouter };
