import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Config' })
export class Config {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @Column()
  title: string;

  @Column()
  password: string;

  @Column()
  mainPageContent: string;
}
