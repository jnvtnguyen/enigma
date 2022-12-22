import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import moment from 'moment';

import BaseModel from './BaseModel';
import User from './User';

@Entity('project')
export default class Project extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'name' })
  public name: string;

  @ManyToOne((type) => User, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  public user: User;

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
