import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import WorkspaceGroupService from '@/api/services/WorkspaceGroupService';
import { CommonError, CreateGroupError } from '@/api/errors';
import CreateGroupRequest from '@/api/requests/CreateGroupRequest';
import WorkspaceGroup from '../models/WorkspaceGroup';

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

  @Get('/:groupKey')
  public async group(@Param('groupKey') groupKey: string, @Res() response: Response): Promise<any> {
    try {
      const group = await this.workspaceGroupService.findOneByKey(groupKey);

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

  @Get('/:groupKey/members')
  public async members(
    @Param('groupKey') groupKey: string,
    @Res() response: Response
  ): Promise<any> {
    try {
      const members = await this.workspaceGroupService.findMembersByKey(groupKey);

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

  @Post('/create')
  public async create(
    @Body() createGroupRequest: CreateGroupRequest,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      const groupByName = await this.workspaceGroupService.findOneByName(createGroupRequest.name);

      if (groupByName) {
        const errorResponse = {
          error: CreateGroupError.NAME_DUPLICATE
        };

        return response.status(400).send(errorResponse);
      }

      const newGroup = new WorkspaceGroup();
      newGroup.workspaceId = request.workspace.id;
      newGroup.name = createGroupRequest.name;
      newGroup.key = createGroupRequest.name.replace(/\s+/g, '-').toLowerCase();
      newGroup.description = createGroupRequest.description;
      newGroup.defaultPermission = createGroupRequest.defaultPermission;

      const createGroupResponse = await this.workspaceGroupService.create(newGroup);

      if (!createGroupResponse) {
        const errorResponse = {
          error: CommonError.UNKNOWN
        };

        return response.status(400).send(errorResponse);
      }

      const successResponse = {
        message: 'Created group successfully',
        group: instanceToPlain(createGroupResponse)
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
