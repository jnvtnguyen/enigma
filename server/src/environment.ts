import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
});

interface Environment {
  environment: string;
  app: {
    port: number;
    globalPrefix: string;
    jwtSecret: string;
    cryptoSecret: string;
  };
  directories: {
    migrations: string;
    migrationsDirectory: string;
    entities: string;
    entitiesDirectory: string;
  };
  database: {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
}

const environment: Environment = {
  environment: process.env.NODE_ENV,
  app: {
    port: Number(process.env['APP_PORT']) || 8000,
    globalPrefix: process.env['APP_GLOBAL_PREFIX'],
    jwtSecret: process.env['APP_JWT_SECRET'],
    cryptoSecret: process.env['APP_CRYPTO_SECRET']
  },
  directories: {
    migrations: process.env['TYPEORM_MIGRATIONS'],
    migrationsDirectory: process.env['TYPEORM_MIGRATIONS_DIRECTORY'],
    entities: process.env['TYPEORM_ENTITIES'],
    entitiesDirectory: process.env['TYPEORM_ENTITIES_DIRECTORY']
  },
  database: {
    type: process.env['TYPEORM_CONNECTION'],
    host: process.env['TYPEORM_HOST'],
    port: Number(process.env['TYPEORM_PORT']),
    username: process.env['TYPEORM_USERNAME'],
    password: process.env['TYPEORM_PASSWORD'],
    database: process.env['TYPEORM_DATABASE'],
    synchronize: Boolean(process.env['TYPEORM_SYNCHRONIZE']),
    logging: Boolean(process.env['TYPEORM_LOGGING'])
  }
};

export default environment;
