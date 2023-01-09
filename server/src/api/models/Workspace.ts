import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';
import { Exclude } from 'class-transformer';
import moment from 'moment';

import BaseModel from './BaseModel';
import Project from './Project';
import User from './User';
import WorkspaceGroup from './WorkspaceGroup';
import WorkspaceUser from './WorkspaceUser';

@Entity('workspace')
export default class Workspace extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'key' })
  public key: string;

  @Exclude()
  @Column({ name: 'owner_id' })
  public ownerId: string;

  @Column({ name: 'default_group_id', nullable: true })
  public defaultGroupId: string;

  @Exclude()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'owner_id' })
  public owner: User;

  @Exclude()
  @OneToMany((type) => Project, (project: Project) => project.workspace, {
    cascade: true
  })
  public projects: Project[];

  @Exclude()
  @OneToMany(
    (type) => WorkspaceGroup,
    (workspaceGroup: WorkspaceGroup) => workspaceGroup.workspace,
    {
      cascade: true
    }
  )
  public groups: WorkspaceGroup[];

  @Exclude()
  @OneToMany((type) => WorkspaceUser, (user: WorkspaceUser) => user.workspace, {
    cascade: true
  })
  public users: WorkspaceUser[];

  @Exclude()
  @OneToOne((type) => WorkspaceGroup, {
    nullable: true
  })
  @JoinColumn({ name: 'default_group_id' })
  public defaultGroup: WorkspaceGroup;

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
