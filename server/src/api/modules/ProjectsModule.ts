import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Project from '@/api/models/Project';
import ProjectService from '@/api/services/ProjectService';
import AuthMiddleware from '@/api/middleware/AuthMiddleware';
import ProjectsController from '@/api/controllers/ProjectsController';
import AuthService from '@/api/services/AuthService';
import AccessToken from '@/api/models/AccessToken';
import User from '@/api/models/User';
import ProjectUser from '@/api/models/ProjectUser';
import WorkspaceMiddleware from '@/api/middleware/WorkspaceMiddleware';
import Workspace from '@/api/models/Workspace';
import WorkspaceService from '@/api/services/WorkspaceService';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceUser from '@/api/models/WorkspaceUser';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      User,
      AccessToken,
      ProjectUser,
      Workspace,
      WorkspaceGroup,
      WorkspaceUser
    ])
  ],
  providers: [ProjectService, AuthService, WorkspaceService],
  controllers: [ProjectsController],
  exports: []
})
export default class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProjectsController);
    consumer.apply(WorkspaceMiddleware).forRoutes(ProjectsController);
  }
}
