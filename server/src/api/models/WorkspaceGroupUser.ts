import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import WorkspaceGroup from './WorkspaceGroup';
import WorkspaceUser from './WorkspaceUser';

@Entity('workspace_group_user')
export default class WorkspaceGroupUser extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'group_id' })
  public groupId: number;

  @Exclude()
  @ManyToOne((type) => WorkspaceUser)
  @JoinColumn({ name: 'user_id' })
  public user: WorkspaceUser;

  @Exclude()
  @ManyToOne((type) => WorkspaceGroup, (workspaceGroup) => workspaceGroup.users)
  @JoinColumn({ name: 'group_id' })
  public group: WorkspaceGroup;

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
