import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import moment from 'moment';

import BaseModel from './BaseModel';
import Workspace from './Workspace';
import WorkspaceGroup from './WorkspaceGroup';
import User from './User';

@Entity('workspace_user')
export default class WorkspaceUser extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Exclude()
  @Column({ name: 'user_id' })
  public userId: string;

  @Exclude()
  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @Exclude()
  @ManyToOne((type) => Workspace)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @Exclude()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Exclude()
  @ManyToMany((type) => WorkspaceGroup, (workspaceGroup) => workspaceGroup.users)
  public groups: WorkspaceGroup[];

  @BeforeInsert()
  public async beforeInsert() {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async beforeUpdate() {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
