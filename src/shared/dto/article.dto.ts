import { Category } from '../entities/Category.entity';
import { Article } from '../entities/Article.entity';

export class ArticleDTO {
  title: string;
  category: Category;
  content: string;
  slug: string;
  isMainArticle: boolean;
  linkedArticles: string[];
}
