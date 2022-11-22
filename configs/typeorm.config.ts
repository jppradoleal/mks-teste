import { resolve } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const { DATABASE_URL } = process.env;

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: [resolve(__dirname, '../**/*.entity.{js,ts}')],
  synchronize: process.env.NODE_ENV === 'development',
};

export default new DataSource(typeOrmConfig as DataSourceOptions);
