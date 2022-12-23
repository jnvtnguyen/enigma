import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import moment from 'moment';

import BaseModel from './BaseModel';
import Project from './Project';
import User from './User';
import WorkspaceGroup from './WorkspaceGroup';

@Entity('workspace')
export default class Workspace extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'key' })
  public key: string;

  @Column({ name: 'owner_id' })
  public ownerId: number;

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
  @ManyToMany((type) => User, (user: User) => user.workspaces)
  @JoinTable({
    name: 'workspaces_users',
    joinColumns: [{ name: 'workspace_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  public users: User[];

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
