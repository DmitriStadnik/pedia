import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'Article' })
export class Article {
  @ObjectIdColumn()
  _id: ObjectID;

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

  @Column()
  linkedArticles: string[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
