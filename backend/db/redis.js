import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isReady = true;

    this.client.on('error', (err) => {
      console.log('Redis client not connected to the server: ', err);
      this.isReady = false;
    });
  }

  async connect() {
    this.client.connect();
    console.log('Connected to Redis server');
  }

  isAlive() {
    return this.isReady;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    return this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
