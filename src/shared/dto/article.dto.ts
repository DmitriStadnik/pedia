import { Article } from './../entities/Article.entity';
import { Category } from './../entities/Category.entity';

export class ArticleDTO {
  title?: string;
  category?: Category;
  content?: string;
  isMainArticle?: boolean;
  linkedArticles?: Article[];
}