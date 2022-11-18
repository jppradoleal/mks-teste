import * as dotenv from 'dotenv';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions } from '@nestjs/common';

dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export const cacheConfig: CacheModuleOptions = <RedisClientOptions>{
  store: redisStore,
  host: REDIS_HOST,
  port: REDIS_PORT,
};
