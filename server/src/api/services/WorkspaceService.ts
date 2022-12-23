import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Workspace from '@/api/models/Workspace';
import WorkspaceRepository from '@/api/repositories/WorkspaceRepository';
import WorkspaceGroup from '@/api/models/WorkspaceGroup';
import WorkspaceGroupRepository from '@/api/repositories/WorkspaceGroupRepository';
import User from '@/api/models/User';
import UserRepository from '@/api/repositories/UserRepository';

@Injectable()
export default class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository,
    @InjectRepository(WorkspaceGroup)
    private readonly workspaceGroupRepository: WorkspaceGroupRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository
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
    const user = await this.userRepository.findOneBy({
      id: workspace.ownerId
    });

    const createWorkspaceResponse = await this.workspaceRepository.save(workspace);

    const newWorkspaceGroup = new WorkspaceGroup();
    newWorkspaceGroup.name = 'Administrators';
    newWorkspaceGroup.workspaceId = createWorkspaceResponse.id;
    newWorkspaceGroup.default_permission = 'admin';

    newWorkspaceGroup.users = [user];

    const createWorkspaceGroupResponse = await this.workspaceGroupRepository.save(
      newWorkspaceGroup
    );

    createWorkspaceResponse.groups = [createWorkspaceGroupResponse];
    createWorkspaceResponse.users = [user];

    console.log(createWorkspaceResponse);

    await this.workspaceRepository.save(createWorkspaceResponse);

    return createWorkspaceResponse;
  }
}
