import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Project from '@/api/models/Project';
import ProjectService from '@/api/services/ProjectService';
import AuthMiddleware from '@/api/middleware/AuthMiddleware';
import ProjectsController from '@/api/controllers/ProjectsController';
import AuthService from '@/api/services/AuthService';
import AccessToken from '@/api/models/AccessToken';
import User from '@/api/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, AccessToken])],
  providers: [ProjectService, AuthService],
  controllers: [ProjectsController],
  exports: []
})
export default class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProjectsController);
  }
}
