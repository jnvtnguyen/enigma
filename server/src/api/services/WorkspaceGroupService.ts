import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceGroupRepository from '@/api/repositories/WorkspaceGroupRepository';

@Injectable()
export default class WorkspaceGroupService {
  constructor(
    @InjectRepository(WorkspaceGroup)
    private readonly workspaceGroupRepository: WorkspaceGroupRepository
  ) {}

  public async groups(workspaceId: string): Promise<WorkspaceGroup[]> {
    let where: any = {
      workspaceId: workspaceId
    };

    const groups = await this.workspaceGroupRepository
      .createQueryBuilder('workspace_group')
      .where(where)
      .leftJoinAndSelect('workspace_group.users', 'workspace_user')
      .loadRelationCountAndMap('workspace_group.userCount', 'workspace_group.users')
      .getMany();

    return groups;
  }
}
