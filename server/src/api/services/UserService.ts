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

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
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
}
