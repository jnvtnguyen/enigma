import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from '@/api/models/User';
import UserService from '@/api/services/UserService';
import UserController from '@/api/controllers/UserController';
import AccessToken from '@/api/models/AccessToken';
import AccessTokenService from '@/api/services/AccessTokenService';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessToken])],
  providers: [UserService, AccessTokenService],
  controllers: [UserController],
  exports: []
})
export default class UserModule {}
