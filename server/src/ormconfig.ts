import { DataSource } from 'typeorm';

import environment from './environment';

export const dataSource: DataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: environment.database.type,
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.database,
  logging: environment.database.logging,
  synchronize: environment.database.synchronize,
  entities: [environment.directories.entities],
  migrations: [environment.directories.migrations]
});
