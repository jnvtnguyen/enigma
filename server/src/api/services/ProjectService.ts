import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Project from '@/api/models/Project';
import ProjectRepository from '@/api/repositories/ProjectRepository';

@Injectable()
export default class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: ProjectRepository
  ) {}

  public async findByUser(userId: number): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      relations: ['user'],
      where: {
        user: {
          id: userId
        }
      }
    });
    return projects;
  }

  public async create(project: Project): Promise<Project> {
    const newProject = await this.projectRepository.save(project);
    return newProject;
  }
}
