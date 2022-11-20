import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../configs/typeorm.config';
import { cacheConfig } from '../configs/cache.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register(cacheConfig),
    UsersModule,
    AuthModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
