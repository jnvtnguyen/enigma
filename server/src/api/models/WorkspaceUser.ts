import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import Workspace from './Workspace';
import User from './User';

@Entity('workspace_user')
export default class WorkspaceUser extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'workspace_id' })
  public workspaceId: number;

  @Exclude()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Exclude()
  @ManyToOne((type) => Workspace, (workspace) => workspace.users)
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
