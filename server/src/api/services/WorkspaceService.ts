import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Workspace from '@/api/models/Workspace';
import WorkspaceRepository from '@/api/repositories/WorkspaceRepository';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceGroupRepository from '@/api/repositories/WorkspaceGroupRepository';
import WorkspaceUser from '@/api/models/WorkspaceUser';
import WorkspaceUserRepository from '@/api/repositories/WorkspaceUserRepository';

@Injectable()
export default class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository,
    @InjectRepository(WorkspaceGroup)
    private readonly workspaceGroupRepository: WorkspaceGroupRepository,
    @InjectRepository(WorkspaceUser)
    private readonly workspaceUserRepository: WorkspaceUserRepository
  ) {}

  public async findAllByUser(userId: string): Promise<Workspace[]> {
    const workspaces = await this.workspaceRepository.find({
      relations: ['users'],
      where: {
        users: {
          userId: userId
        }
      }
    });

    return workspaces;
  }

  public async findOneByKey(key?: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        key: key
      }
    });

    return workspace;
  }

  public async create(workspace: Workspace): Promise<Workspace> {
    const createWorkspaceResponse = await this.workspaceRepository.save(workspace);

    const newAdminWorkspaceGroup = new WorkspaceGroup();
    newAdminWorkspaceGroup.name = 'Administrators';
    newAdminWorkspaceGroup.workspaceId = createWorkspaceResponse.id;
    newAdminWorkspaceGroup.default_permission = 'admin';

    const newDefaultWorkspaceGroup = new WorkspaceGroup();
    newDefaultWorkspaceGroup.name = 'Default';
    newDefaultWorkspaceGroup.workspaceId = createWorkspaceResponse.id;
    newDefaultWorkspaceGroup.default_permission = 'read';

    const newWorkspaceUser = new WorkspaceUser();
    newWorkspaceUser.userId = workspace.ownerId;
    newWorkspaceUser.workspaceId = createWorkspaceResponse.id;

    const createWorkspaceUserResponse = await this.workspaceUserRepository.save(newWorkspaceUser);

    newAdminWorkspaceGroup.users = [createWorkspaceUserResponse];

    const createAdminWorkspaceGroupResponse = await this.workspaceGroupRepository.save(
      newAdminWorkspaceGroup
    );

    const createDefaultWorkspaceGroupResponse = await this.workspaceGroupRepository.save(
      newDefaultWorkspaceGroup
    );

    createWorkspaceResponse.groups = [
      createAdminWorkspaceGroupResponse,
      createDefaultWorkspaceGroupResponse
    ];
    createWorkspaceResponse.defaultGroup = createDefaultWorkspaceGroupResponse;

    createWorkspaceResponse.users = [createWorkspaceUserResponse];

    await this.workspaceRepository.save(createWorkspaceResponse);

    return createWorkspaceResponse;
  }
}
