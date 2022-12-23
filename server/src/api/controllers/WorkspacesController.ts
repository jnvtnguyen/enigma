import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import WorkspaceService from '@/api/services/WorkspaceService';
import CreateWorkspaceRequest from '@/api/requests/CreateWorkspaceRequest';
import { CommonError, CreateProjectError, CreateWorkspaceError } from '@/api/errors';
import Workspace from '@/api/models/Workspace';

@Controller('/workspaces')
export default class WorkspacesController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('/create')
  public async create(
    @Body() createWorkspaceRequest: CreateWorkspaceRequest,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      const workspaceByName = await this.workspaceService.findOneByOwner(
        request.user.id,
        createWorkspaceRequest.name
      );

      const workspaceByKey = await this.workspaceService.findOneByOwner(
        request.user.id,
        createWorkspaceRequest.key
      );

      if (workspaceByName || workspaceByKey) {
        const errorResponse = {
          error: [
            ...(workspaceByName ? [CreateWorkspaceError.NAME_DUPLICATE] : []),
            ...(workspaceByKey ? [CreateProjectError.KEY_DUPLICATE] : [])
          ]
        };

        return response.status(400).send(errorResponse);
      }

      const newWorkspace = new Workspace();
      newWorkspace.ownerId = request.user.id;
      newWorkspace.name = createWorkspaceRequest.name;
      newWorkspace.key = createWorkspaceRequest.key;

      const createWorkspaceResponse = await this.workspaceService.create(newWorkspace);

      if (!createWorkspaceResponse) {
        const errorResponse = {
          error: CommonError.UNKNOWN
        };

        return response.status(400).send(errorResponse);
      }

      const successResponse = {
        message: 'Created workspace successfully',
        workspace: instanceToPlain(newWorkspace)
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
