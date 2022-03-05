import { Entity, Column, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import { Category } from './Category.entity';

@Entity({ name: 'Article' })
export class Article {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  slug: string;

  @ManyToOne(() => Category)
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
