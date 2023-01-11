import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import { ProjectPermission } from './ProjectUser';
import Workspace from './Workspace';
import WorkspaceUser from './WorkspaceUser';

@Entity('workspace_group')
export default class WorkspaceGroup extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Exclude()
  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @Column({ name: 'default_permission', type: 'enum', enum: ['read', 'write', 'admin'] })
  public default_permission: ProjectPermission;

  @Column({ name: 'description', nullable: true })
  public description?: string;

  @Exclude()
  @ManyToMany((type) => WorkspaceUser)
  @JoinTable({
    name: 'workspace_groups_users',
    joinColumns: [{ name: 'group_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  public users: WorkspaceUser[];

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
