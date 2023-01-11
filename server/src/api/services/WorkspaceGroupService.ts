import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceGroupRepository from '@/api/repositories/WorkspaceGroupRepository';
import User from '@/api/models/User';

@Injectable()
export default class WorkspaceGroupService {
  constructor(
    @InjectRepository(WorkspaceGroup)
    private readonly workspaceGroupRepository: WorkspaceGroupRepository
  ) {}

  public async groups(workspaceId: string): Promise<WorkspaceGroup[]> {
    const groups = await this.workspaceGroupRepository
      .createQueryBuilder('workspace_group')
      .where({ workspaceId: workspaceId })
      .leftJoinAndSelect('workspace_group.users', 'workspace_user')
      .loadRelationCountAndMap('workspace_group.userCount', 'workspace_group.users')
      .getMany();

    return groups;
  }

  public async findOneByName(name: string): Promise<WorkspaceGroup> {
    const group = await this.workspaceGroupRepository.findOne({
      where: {
        name: name
      }
    });

    return group;
  }

  public async findMembersByName(name: string): Promise<User[]> {
    const group = await this.workspaceGroupRepository.findOne({
      relations: ['users', 'users.user'],
      where: {
        name: name
      }
    });

    return group.users.map((u) => u.user);
  }
}
