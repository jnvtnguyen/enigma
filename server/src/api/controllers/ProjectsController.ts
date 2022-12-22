import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import ProjectService from '@/api/services/ProjectService';

@Controller('projects')
export default class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  public async projects(@Req() request: Request, @Res() response: Response): Promise<any> {
    const projects = await this.projectService.findByUser(request.user.id);

    const successResponse: any = {
      projects: projects
    };

    return response.send(successResponse);
  }
}
