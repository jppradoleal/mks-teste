import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { PersonModule } from './person/person.module';
import { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [resolve(__dirname, '../**/*.entity.{js,ts}')],
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        <RedisClientOptions>{
          store: redisStore,
          url: config.get('REDIS_URL'),
        },
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
