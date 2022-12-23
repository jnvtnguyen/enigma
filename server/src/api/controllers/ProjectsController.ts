import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import ProjectService, { ProjectsQuery } from '@/api/services/ProjectService';
import CreateProjectRequest from '@/api/requests/CreateProjectRequest';
import Project from '@/api/models/Project';
import { CommonError, CreateProjectError } from '@/api/errors';

@Controller('projects')
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

      const projects = await this.projectService.projects(request.user.id, query);

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
      const project = await this.projectService.findByOwner(
        request.user.id,
        createProjectRequest.name
      );

      if (project.length > 0) {
        const errorResponse: any = {
          error: CreateProjectError.NAME_DUPLICATE
        };

        return response.status(400).send(errorResponse);
      }

      const newProject = new Project();
      newProject.ownerId = request.user.id;
      newProject.name = createProjectRequest.name;

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
