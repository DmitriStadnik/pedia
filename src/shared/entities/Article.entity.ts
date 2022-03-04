import { Category } from './Category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Category, category => category.articles)
  category: Category;

  @Column()
  content: string;

  @Column({ default: false })
  isMainArticle: boolean;

  @Column()
  linkedArticles: Article[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}