import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';

import Project from '@/api/models/Project';
import ProjectUser from '@/api/models/ProjectUser';
import ProjectRepository from '@/api/repositories/ProjectRepository';
import ProjectUserRepository from '@/api/repositories/ProjectUserRepository';

export interface ProjectsQuery {
  search?: string;
}

@Injectable()
export default class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: ProjectRepository,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: ProjectUserRepository
  ) {}

  public async projects(workspaceId: string, query: ProjectsQuery): Promise<Project[]> {
    let where: any = {
      workspaceId: workspaceId
    };

    if (query.search) {
      where = {
        ...where,
        name: Like(`%${query.search}%`)
      };
    }

    const projects = await this.projectRepository.find({
      where: where
    });

    return projects;
  }

  public async findOneByWorkspace(
    workspaceId: string,
    name?: string,
    key?: string
  ): Promise<Project> {
    let where: any = {
      workspaceId: workspaceId
    };

    if (name) {
      where = {
        ...where,
        name: name
      };
    }

    if (key) {
      where = {
        ...where,
        key: key
      };
    }

    const project = await this.projectRepository.findOne({
      where: where
    });

    return project;
  }

  public async create(project: Project): Promise<Project> {
    const createProjectResponse = await this.projectRepository.save(project);

    const newProjectUser = new ProjectUser();
    newProjectUser.projectId = createProjectResponse.id;
    newProjectUser.userId = project.ownerId;
    newProjectUser.projectPermission = 'admin';

    await this.projectUserRepository.save(newProjectUser);
    return createProjectResponse;
  }
}
