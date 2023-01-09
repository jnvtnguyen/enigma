import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import ProjectService, { ProjectsQuery } from '@/api/services/ProjectService';
import CreateProjectRequest from '@/api/requests/CreateProjectRequest';
import Project from '@/api/models/Project';
import { CommonError, CreateProjectError } from '@/api/errors';

@Controller('/workspaces/:workspaceKey/projects')
export default class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  public async projects(
    @Req() request: Request,
    @Res() response: Response,
    @Query('search') search: string
  ): Promise<any> {
    try {
      const query: ProjectsQuery = {
        search: search
      };

      const projects = await this.projectService.projects(request.workspace.id, query);

      const successResponse: any = {
        projects: instanceToPlain(projects)
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

  @Post('/create')
  public async create(
    @Body() createProjectRequest: CreateProjectRequest,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    try {
      const projectByName = await this.projectService.findOneByWorkspace(
        request.workspace.id,
        createProjectRequest.name
      );

      const projectByKey = await this.projectService.findOneByWorkspace(
        request.workspace.id,
        createProjectRequest.key
      );

      if (projectByName || projectByKey) {
        const errorResponse = {
          error: [
            ...(projectByName ? [CreateProjectError.NAME_DUPLICATE] : []),
            ...(projectByKey ? [CreateProjectError.KEY_DUPLICATE] : [])
          ]
        };

        return response.status(400).send(errorResponse);
      }

      const newProject = new Project();
      newProject.workspaceId = request.workspace.id;
      newProject.ownerId = request.user.id;
      newProject.name = createProjectRequest.name;
      newProject.key = createProjectRequest.key;
      newProject.description = createProjectRequest.description;

      const createProjectResponse = await this.projectService.create(newProject);

      if (!createProjectResponse) {
        const errorResponse = {
          error: CommonError.UNKNOWN
        };

        return response.status(400).send(errorResponse);
      }

      const successResponse = {
        message: 'Created project successfully',
        project: instanceToPlain(newProject)
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
