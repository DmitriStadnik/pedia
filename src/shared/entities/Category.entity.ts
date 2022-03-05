import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({ name: 'Category' })
export class Category {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  slug: string;
}