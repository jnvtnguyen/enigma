import { Controller, Get, Param, Req, Res } from '@nestjs/common';
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

      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Get('/:groupName')
  public async group(
    @Param('groupName') groupName: string,
    @Res() response: Response
  ): Promise<any> {
    try {
      const group = await this.workspaceGroupService.findOneByName(groupName);

      const successResponse = {
        message: 'Find group successfully',
        group: instanceToPlain(group)
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }

  @Get('/:groupName/members')
  public async members(
    @Param('groupName') groupName: string,
    @Res() response: Response
  ): Promise<any> {
    try {
      const members = await this.workspaceGroupService.findMembersByName(groupName);

      const successResponse = {
        message: 'Find members successfully',
        members: instanceToPlain(members)
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        error: CommonError.UNKNOWN,
        errorMessage: error
      };

      return response.status(500).send(errorResponse);
    }
  }
}
