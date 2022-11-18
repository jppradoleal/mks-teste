import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

dotenv.config()

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = process.env

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: Number.parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        resolve(__dirname, '../**/*.entity.{js,ts}')
    ],
    synchronize: process.env.NODE_ENV !== 'prod'
}
