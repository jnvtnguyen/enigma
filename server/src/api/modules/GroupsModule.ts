import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import GroupsController from '@/api/controllers/GroupsController';
import AuthMiddleware from '@/api/middleware/AuthMiddleware';
import WorkspaceMiddleware from '@/api/middleware/WorkspaceMiddleware';
import AccessToken from '@/api/models/AccessToken';
import User from '@/api/models/User';
import Workspace from '@/api/models/Workspace';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceUser from '@/api/models/WorkspaceUser';
import AuthService from '@/api/services/AuthService';
import WorkspaceGroupService from '@/api/services/WorkspaceGroupService';
import WorkspaceService from '@/api/services/WorkspaceService';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AccessToken, Workspace, WorkspaceGroup, WorkspaceUser])
  ],
  providers: [WorkspaceGroupService, AuthService, WorkspaceService],
  controllers: [GroupsController],
  exports: []
})
export default class GroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GroupsController);
    consumer.apply(WorkspaceMiddleware).forRoutes(GroupsController);
  }
}
