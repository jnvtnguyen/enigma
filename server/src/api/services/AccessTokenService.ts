import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import AccessToken from '@/api/models/AccessToken';
import AccessTokenRepository from '@/api/repositories/AccessTokenRepository';

@Injectable()
export default class AccessTokenService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: AccessTokenRepository
  ) {}

  public async create(accessToken: AccessToken): Promise<AccessToken> {
    return await this.accessTokenRepository.save(accessToken);
  }
}
