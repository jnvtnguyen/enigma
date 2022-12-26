import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from '@/api/models/User';
import UserRepository from '@/api/repositories/UserRepository';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  public async findOneById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: ['defaultWorkspace'],
      where: {
        id: userId
      }
    });
    return user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      relations: ['defaultWorkspace'],
      where: {
        email: email
      }
    });
    return user;
  }

  public async create(user: User): Promise<User> {
    const createUserResponse = await this.userRepository.save(user);

    return createUserResponse;
  }

  public async finishLanding(userId: string): Promise<any> {
    const finishLandingResponse = await this.userRepository.update(userId, {
      finishedLanding: true
    });

    return finishLandingResponse;
  }

  public async setDefaultWorkspace(userId: string, workspaceId: string): Promise<any> {
    const setDefaultWorkspaceResponse = await this.userRepository.update(userId, {
      defaultWorkspaceId: workspaceId
    });

    return setDefaultWorkspaceResponse;
  }
}
