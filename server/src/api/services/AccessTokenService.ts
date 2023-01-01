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

  public async deleteByToken(token: string): Promise<any> {
    const findTokenResponse = await this.accessTokenRepository.findOne({
      where: {
        token: token
      }
    });

    if (!findTokenResponse) return undefined;

    const deleteTokenResponse = await this.accessTokenRepository.delete(findTokenResponse.id);

    return deleteTokenResponse;
  }
}
