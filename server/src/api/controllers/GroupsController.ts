import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import WorkspaceGroupService from '@/api/services/WorkspaceGroupService';
import { CommonError } from '@/api/errors';

@Controller('/workspaces/:workspaceKey/groups')
export default class GroupsController {
  constructor(private readonly workspaceGroupService: WorkspaceGroupService) {}

  @Get('/')
  public async groups(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const groups = await this.workspaceGroupService.groups(request.workspace.id);

      const successResponse: any = {
        groups: instanceToPlain(groups)
      };

      return response.send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.send(errorResponse);
    }
  }
}
