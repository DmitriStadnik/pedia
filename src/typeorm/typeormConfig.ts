import { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pedia',
  logging: true,
  entities: ['./dist/shared/entities/*.entity{.ts,.js}'],
  synchronize: false,
  maxQueryExecutionTime: 5000,
  migrations: ['./dist/typeorm/migrations/**/*{.ts,.js}'],
  migrationsTransactionMode: 'each',
  cli: {
    migrationsDir: './dist/typeorm/migrations',
    entitiesDir: './dist/shared/entities',
  },
};

export default typeormConfig;
