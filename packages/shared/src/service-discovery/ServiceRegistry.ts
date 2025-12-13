export interface ServiceInstance {
  id: string;
  name: string;
  host: string;
  port: number;
  health: string;
  lastHeartbeat: Date;
}

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services = new Map<string, ServiceInstance>();

  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  register(service: Omit<ServiceInstance, 'lastHeartbeat'>): void {
    const serviceWithHeartbeat: ServiceInstance = {
      ...service,
      lastHeartbeat: new Date()
    };
    this.services.set(service.id, serviceWithHeartbeat);
    console.log(`Service registered: ${service.name} at ${service.host}:${service.port}`);
  }

  unregister(serviceId: string): void {
    this.services.delete(serviceId);
    console.log(`Service unregistered: ${serviceId}`);
  }

  getService(serviceName: string): ServiceInstance | undefined {
    return Array.from(this.services.values())
      .find(service => service.name === serviceName && this.isHealthy(service));
  }

  getAllServices(): ServiceInstance[] {
    return Array.from(this.services.values())
      .filter(service => this.isHealthy(service));
  }

  updateHeartbeat(serviceId: string): void {
    const service = this.services.get(serviceId);
    if (service) {
      service.lastHeartbeat = new Date();
    }
  }

  private isHealthy(service: ServiceInstance): boolean {
    const now = new Date();
    const timeDiff = now.getTime() - service.lastHeartbeat.getTime();
    return timeDiff < 30000; // 30 seconds timeout
  }

  cleanup(): void {
    const now = new Date();
    for (const [id, service] of this.services.entries()) {
      if (!this.isHealthy(service)) {
        this.services.delete(id);
        console.log(`Removed unhealthy service: ${service.name}`);
      }
    }
  }
}