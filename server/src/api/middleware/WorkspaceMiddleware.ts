import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import WorkspaceService from '@/api/services/WorkspaceService';
import { CommonError } from '@/api/errors';

@Injectable()
export default class WorkspaceMiddleware implements NestMiddleware {
  constructor(private readonly workspaceService: WorkspaceService) {}

  async use(request: Request, response: Response, next: NextFunction): Promise<any> {
    const { workspaceKey } = request.params;
    const workspaceByUser = await this.workspaceService.findOneByKey(workspaceKey, request.user.id);

    if (!workspaceByUser) {
      const errorResponse = {
        error: CommonError.UNAUTHORIZED
      };

      return response.status(401).send(errorResponse);
    }

    request.workspace = workspaceByUser;

    return next();
  }
}
