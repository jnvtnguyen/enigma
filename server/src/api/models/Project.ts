import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';
import moment from 'moment';
import { Exclude } from 'class-transformer';

import BaseModel from './BaseModel';
import User from './User';
import ProjectUser from './ProjectUser';

@Entity('project')
export default class Project extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'owner_id' })
  public ownerId: number;

  @Column({ name: 'name' })
  public name: string;

  @Exclude()
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
