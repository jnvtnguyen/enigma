import {
  BeforeUpdate,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';
import moment from 'moment';

import BaseModel from './BaseModel';
import AccessToken from './AccessToken';
import Workspace from './Workspace';

@Entity('user')
export default class User extends BaseModel {
  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (error, salt) {
        if (error) {
          return reject(error);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            return reject(error);
          }
          resolve(hash);
        });
      });
    });
  }

  public static comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response === true);
      });
    });
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'email' })
  public email: string;

  @Exclude()
  @Column({ name: 'password' })
  public password: string;

  @Exclude()
  @OneToMany((type) => AccessToken, (accessToken) => accessToken.user)
  public accessTokens: AccessToken[];

  @BeforeInsert()
  public async beforeInsert(): Promise<void> {
    this.password = await User.hashPassword(this.password);
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async beforeUpdate(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
