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

  public async findOneByKey(key: string, userId?: string): Promise<Workspace> {
    let where: any = {
      key: key
    };

    if (userId) {
      where = {
        ...where,
        users: {
          userId: userId
        }
      };
    }

    const workspace = await this.workspaceRepository.findOne({
      relations: ['users'],
      where: where
    });

    return workspace;
  }

  public async create(workspace: Workspace): Promise<Workspace> {
    const createWorkspaceResponse = await this.workspaceRepository.save(workspace);

    const newAdminWorkspaceGroup = new WorkspaceGroup();
    newAdminWorkspaceGroup.name = 'Administrators';
    newAdminWorkspaceGroup.key = 'administrators';
    newAdminWorkspaceGroup.description =
      'This is the default created Administrators group and it gives users full access to both the workspace and its projects';
    newAdminWorkspaceGroup.workspaceId = createWorkspaceResponse.id;
    newAdminWorkspaceGroup.defaultPermission = 'admin';

    const newDefaultWorkspaceGroup = new WorkspaceGroup();
    newDefaultWorkspaceGroup.name = 'Default';
    newDefaultWorkspaceGroup.key = 'default';
    newDefaultWorkspaceGroup.description =
      'This is the default created Default group and it is the default assigned group to new users and it allows only read access to the workspace and its projects';
    newDefaultWorkspaceGroup.workspaceId = createWorkspaceResponse.id;
    newDefaultWorkspaceGroup.defaultPermission = 'read';

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
