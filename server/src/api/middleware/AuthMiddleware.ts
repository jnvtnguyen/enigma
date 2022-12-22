import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import AuthService from '@/api/services/AuthService';
import { CommonError } from '@/api/errors';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(request: Request, response: Response, next: NextFunction): Promise<any> {
    const userId = await this.authService.parseAuthFromRequest(request);

    if (!userId) {
      return response.status(401).send({
        error: CommonError.UNAUTHORIZED
      });
    }

    const tokenExists = await this.authService.checkTokenExists(request);
    if (!tokenExists) {
      return response.status(401).send({
        error: CommonError.UNAUTHORIZED
      });
    }

    request.user = await this.authService.getUser(userId);

    return next();
  }
}
