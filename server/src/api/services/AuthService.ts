import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import express from 'express';
import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';

import AccessToken from '@/api/models/AccessToken';
import AccessTokenRepository from '@/api/repositories/AccessTokenRepository';
import User from '@/api/models/User';
import UserRepository from '@/api/repositories/UserRepository';
import environment from '@/environment';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: AccessTokenRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  public static decryptCryptoToken(encryptedToken: string): any {
    const decryptedToken = crypto.AES.decrypt(encryptedToken, environment.app.cryptoSecret);
    const token = decryptedToken.toString(crypto.enc.Utf8);

    return token;
  }

  public async parseAuthFromRequest(request: express.Request): Promise<any> {
    const authorization = request.header('authorization');
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      if (!authorization) {
        return undefined;
      }
      const decryptedUser = await this.decryptToken(authorization.split(' ')[1]);
      if (!decryptedUser) return undefined;
      return decryptedUser.id;
    }
  }

  public async decryptToken(encryptedToken: string): Promise<any> {
    const token = AuthService.decryptCryptoToken(encryptedToken);

    return new Promise<any>((resolve, reject) => {
      jwt.verify(token, environment.app.jwtSecret, (error, decodedToken: any) => {
        if (error) {
          return resolve(undefined);
        }

        return resolve({ id: decodedToken.id });
      });
    });
  }

  public async checkTokenExists(request: express.Request): Promise<boolean> {
    const authorization = request.header('authorization');
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      if (!authorization) {
        return undefined;
      }

      const encryptedToken = authorization.split(' ')[1];
      const token = AuthService.decryptCryptoToken(encryptedToken);

      const tokenExists =
        (await this.accessTokenRepository.findOne({
          where: {
            token: token
          }
        })) != undefined;

      return tokenExists;
    }

    return false;
  }

  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return user;
  }
}
