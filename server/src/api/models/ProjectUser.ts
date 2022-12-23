import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Exclude } from 'class-transformer';
import moment from 'moment';

import BaseModel from './BaseModel';
import Project from './Project';

export type ProjectPermission = 'read' | 'write' | 'admin';

@Entity('project_user')
export default class ProjectUser extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'project_id' })
  public projectId: number;

  @Exclude()
  @ManyToOne((type) => Project)
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_permission' })
  public projectPermission: ProjectPermission;

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
