import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '@/api/models/User';
import UserService from '@/api/services/UserService';
import UserController from '@/api/controllers/UserController';
import AccessToken from '@/api/models/AccessToken';
import AccessTokenService from '@/api/services/AccessTokenService';
import AuthService from '@/api/services/AuthService';
import AuthMiddleware from '@/api/middleware/AuthMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessToken])],
  providers: [UserService, AccessTokenService, AuthService],
  controllers: [UserController],
  exports: []
})
export default class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/user/landing/finish',
        { path: '/user', method: RequestMethod.GET },
        '/user/workspace/set-default',
        '/user/logout'
      );
  }
}
