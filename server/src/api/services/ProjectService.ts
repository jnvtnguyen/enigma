import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';

import Project from '@/api/models/Project';
import ProjectRepository from '@/api/repositories/ProjectRepository';

export interface ProjectsQuery {
  search?: string;
}

@Injectable()
export default class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: ProjectRepository
  ) {}

  public async projects(userId: number, query: ProjectsQuery): Promise<Project[]> {
    let where: any = {
      user: {
        id: userId
      }
    };

    if (query.search) {
      where = {
        ...where,
        name: Like(`%${query.search}%`)
      };
    }

    const projects = await this.projectRepository.find({
      relations: ['user'],
      where: where
    });

    return projects;
  }

  public async findByUser(userId: number, name?: string): Promise<Project[]> {
    let where: any = {
      user: {
        id: userId
      }
    };

    if (name) {
      where = {
        ...where,
        name: name
      };
    }

    const projects = await this.projectRepository.find({
      relations: ['user'],
      where: where
    });

    return projects;
  }

  public async create(project: Project): Promise<Project> {
    const newProject = await this.projectRepository.save(project);
    return newProject;
  }
}
