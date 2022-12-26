import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import WorkspaceService from '@/api/services/WorkspaceService';
import CreateWorkspaceRequest from '@/api/requests/CreateWorkspaceRequest';
import { CommonError, CreateWorkspaceError, FetchWorkspaceError } from '@/api/errors';
import Workspace from '@/api/models/Workspace';

@Controller('/workspaces')
export default class WorkspacesController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('/')
  public async workspaces(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const workspaces = await this.workspaceService.findAllByUser(request.user.id);

      const successResponse = {
        workspaces: instanceToPlain(workspaces)
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
    @Body() createWorkspaceRequest: CreateWorkspaceRequest,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      const workspace = await this.workspaceService.findOneByKey(createWorkspaceRequest.key);

      if (workspace) {
        const errorResponse = {
          error: CreateWorkspaceError.KEY_DUPLICATE
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

  @Get('/:workspaceKey')
  public async workspace(
    @Param('workspaceKey') workspaceKey: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      const workspace = await this.workspaceService.findOneByKey(workspaceKey);

      if (workspace) {
        const workspaceByUser = await this.workspaceService.findOneByKey(
          workspaceKey,
          request.user.id
        );

        if (!workspaceByUser) {
          const errorResponse = {
            error: FetchWorkspaceError.UNAUTHORIZED
          };

          return response.status(401).send(errorResponse);
        }
      }

      const successResponse = {
        message: 'Find workspace successfully',
        workspace: instanceToPlain(workspace)
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
