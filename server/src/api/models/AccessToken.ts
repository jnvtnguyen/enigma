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

@Entity('access_token')
export default class AccessToken extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ name: 'token' })
  public token: string;

  @ManyToOne((type) => User)
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
