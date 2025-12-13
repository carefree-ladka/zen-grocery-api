import axios from 'axios';
import { ServiceInstance, ServiceRegistry } from './ServiceRegistry';

export class ServiceDiscovery {
  private registry = ServiceRegistry.getInstance();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  registerService(name: string, host: string, port: number): string {
    const serviceId = `${name}-${Date.now()}`;
    this.registry.register({
      id: serviceId,
      name,
      host,
      port,
      health: `/health`
    });

    this.startHeartbeat(serviceId);
    return serviceId;
  }

  discoverService(serviceName: string): string | null {
    const service = this.registry.getService(serviceName);
    return service ? `http://${service.host}:${service.port}` : null;
  }

  private startHeartbeat(serviceId: string): void {
    this.heartbeatInterval = setInterval(() => {
      this.registry.updateHeartbeat(serviceId);
    }, 10000); // Update every 10 seconds
  }

  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }

  async checkServiceHealth(service: ServiceInstance): Promise<boolean> {
    try {
      const response = await axios.get(`http://${service.host}:${service.port}${service.health}`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
