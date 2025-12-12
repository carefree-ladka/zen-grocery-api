import { createClient, RedisClientType } from 'redis';

export class CacheService {
  private static client: RedisClientType | null = null;

  static async connect(redisUrl?: string): Promise<void> {
    this.client = createClient({
      url: redisUrl ?? 'redis://localhost:6379'
    });

    this.client.on('error', (err) => console.log('Redis Client Error', err));
    await this.client.connect();
    console.log('Redis connected successfully');
  }

  static async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      return await this.client.get(key);
    } catch (error) {
      console.warn('Redis get failed:', (error as Error).message);
      return null;
    }
  }

  static async set(key: string, value: string, ttl: number = 300): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.setEx(key, ttl, value);
    } catch (error) {
      console.warn('Redis set failed:', (error as Error).message);
    }
  }

  static async del(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.del(key);
    } catch (error) {
      console.warn('Redis del failed:', (error as Error).message);
    }
  }

  static async disconnect(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.disconnect();
    } catch (error) {
      console.warn('Redis disconnect failed:', (error as Error).message);
    }
  }
}
