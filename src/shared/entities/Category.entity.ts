import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Category' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @Column()
  title: string;

  @Column()
  slug: string;
}
