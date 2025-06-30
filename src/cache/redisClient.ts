import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

let redisClient: Redis;

try {
  redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  
  redisClient.on('connect', () => {
    console.log('Successfully connected to Redis.');
  });
  
  redisClient.on('error', (err) => {
    console.warn('Could not connect to Redis. Caching will be disabled.', err.message);
  });
} catch (error) {
  console.warn('Redis connection failed during initialization. Caching will be disabled.');
  redisClient = {
    get: async () => null,
    set: async () => 'OK',
    del: async () => 1,
  } as any;
}

export { redisClient };