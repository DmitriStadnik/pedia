import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Article' })
export class Article {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  category: string;

  @Column()
  content: string;

  @Column({ default: false })
  isMainArticle: boolean;

  @Column('text', { array: true })
  linkedArticles: string[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
