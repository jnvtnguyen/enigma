import { Column } from 'typeorm';

export default class BaseModel {
  @Column({ name: 'created_date' })
  public createdDate: string;

  @Column({ name: 'modified_date' })
  public modifiedDate: string;
}
