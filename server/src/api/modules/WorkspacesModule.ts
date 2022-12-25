import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AuthService from '@/api/services/AuthService';
import WorkspaceService from '@/api/services/WorkspaceService';
import Workspace from '@/api/models/Workspace';
import User from '@/api/models/User';
import AccessToken from '@/api/models/AccessToken';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceUser from '@/api/models/WorkspaceUser';
import WorkspacesController from '@/api/controllers/WorkspacesController';
import AuthMiddleware from '@/api/middleware/AuthMiddleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, User, AccessToken, WorkspaceUser, WorkspaceGroup])
  ],
  providers: [WorkspaceService, AuthService],
  controllers: [WorkspacesController],
  exports: []
})
export default class WorkspacesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(WorkspacesController);
  }
}
