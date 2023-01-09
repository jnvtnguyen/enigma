import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import environment from '@/environment';
import UserModule from '@/api/modules/UserModule';
import WorkspacesModule from '@/api/modules/WorkspacesModule';
import ProjectsModule from '@/api/modules/ProjectsModule';
import GroupsModule from './api/modules/GroupsModule';

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
    WorkspacesModule,
    ProjectsModule,
    GroupsModule
  ]
})
export default class App {}
