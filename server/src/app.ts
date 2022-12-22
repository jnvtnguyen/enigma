import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import environment from '@/environment';
import UserModule from '@/api/modules/UserModule';
import ProjectsModule from '@/api/modules/ProjectsModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: environment.database.type,
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.database,
      synchronize: environment.database.synchronize,
      logging: environment.database.logging,
      entities: [environment.directories.entities],
      migrations: [environment.directories.migrations]
    }),
    UserModule,
    ProjectsModule
  ]
})
export default class App {}
