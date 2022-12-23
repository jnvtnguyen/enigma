import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Workspace from '@/api/models/Workspace';
import WorkspaceRepository from '@/api/repositories/WorkspaceRepository';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceGroupRepository from '@/api/repositories/WorkspaceGroupRepository';
import WorkspaceGroupUserRepository from '@/api/repositories/WorkspaceGroupUserRepository';
import WorkspaceGroupUser from '@/api/models/WorkspaceGroupUser';
import WorkspaceUser from '@/api/models/WorkspaceUser';

@Injectable()
export default class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository,
    @InjectRepository(WorkspaceUser)
    private readonly workspaceUserRepository: WorkspaceUserRepository,
    @InjectRepository(WorkspaceGroup)
    private readonly workspaceGroupRepository: WorkspaceGroupRepository,
    @InjectRepository(WorkspaceGroupUser)
    private readonly workspaceGroupUserRepository: WorkspaceGroupUserRepository
  ) {}

  public async findAllWithUser(userId: number): Promise<Workspace[]> {}

  public async findOneByOwner(ownerId: number, name?: string, key?: string): Promise<Workspace> {
    let where: any = {
      ownerId: ownerId
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

    const workspace = await this.workspaceRepository.findOne({
      where: where
    });

    return workspace;
  }

  public async create(workspace: Workspace): Promise<Workspace> {
    const createWorkspaceResponse = await this.workspaceRepository.save(workspace);

    const newWorkspaceGroup = new WorkspaceGroup();
    newWorkspaceGroup.name = 'Administrators';
    newWorkspaceGroup.workspaceId = workspace.id;
    newWorkspaceGroup.default_permission = 'admin';

    const createWorkspaceGroupResponse = await this.workspaceGroupRepository.save(
      newWorkspaceGroup
    );

    const newWorkspaceUser = new WorkspaceUser();
    newWorkspaceUser.userId = workspace.ownerId;
    newWorkspaceUser.workspaceId = createWorkspaceResponse.id;

    const createWorkspaceUserResponse = await this.workspaceUserRepository.save(newWorkspaceUser);

    const newWorkspaceGroupUser = new WorkspaceGroupUser();
    newWorkspaceGroupUser.userId = createWorkspaceUserResponse.id;
    newWorkspaceGroupUser.groupId = createWorkspaceGroupResponse.id;

    await this.workspaceGroupUserRepository.save(newWorkspaceGroupUser);

    return createWorkspaceResponse;
  }
}
