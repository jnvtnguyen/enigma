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

  public async projects(userId: number, query: ProjectsQuery): Promise<Project[]> {
    let where: any = {
      ownerId: userId
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

  public async findByOwner(userId: number, name?: string): Promise<Project[]> {
    let where: any = {
      ownerId: userId
    };

    if (name) {
      where = {
        ...where,
        name: name
      };
    }

    const projects = await this.projectRepository.find({
      where: where
    });

    return projects;
  }

  public async create(project: Project): Promise<Project> {
    const newProject = await this.projectRepository.save(project);

    const newProjectUser = new ProjectUser();
    newProjectUser.projectId = newProject.id;
    newProjectUser.userId = project.ownerId;
    newProjectUser.projectPermission = 'admin';

    await this.projectUserRepository.save(newProjectUser);
    return newProject;
  }
}
