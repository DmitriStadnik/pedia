import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({ name: 'Config' })
export class Config {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  password: string;
}
