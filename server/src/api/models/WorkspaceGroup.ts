import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import { ProjectPermission } from './ProjectUser';
import WorkspaceGroupUser from './WorkspaceGroupUser';
import Workspace from './Workspace';

@Entity('workspace_group')
export default class WorkspaceGroup extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'workspace_id' })
  public workspaceId: number;

  @Column({ name: 'default_permission', type: 'enum', enum: ['read', 'write', 'admin'] })
  public default_permission: ProjectPermission;

  @Exclude()
  @OneToMany((type) => WorkspaceGroupUser, (workspaceGroupUser) => workspaceGroupUser.group)
  public users: WorkspaceGroupUser[];

  @Exclude()
  @ManyToOne((type) => Workspace, (workspace) => workspace.groups)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @BeforeInsert()
  public async beforeInsert(): Promise<void> {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async beforeUpdate(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
