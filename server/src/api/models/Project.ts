import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import User from './User';
import ProjectUser from './ProjectUser';
import Workspace from './Workspace';

@Entity('project')
export default class Project extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'key' })
  public key: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @Column({ name: 'owner_id' })
  public ownerId: string;

  @Exclude()
  @ManyToOne((type) => Workspace, (workspace) => workspace.projects)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @Exclude()
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'owner_id' })
  public owner: User;

  @Exclude()
  @OneToMany((type) => ProjectUser, (projectUser) => projectUser.project)
  public users: ProjectUser[];

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
