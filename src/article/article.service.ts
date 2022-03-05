import { ArticleDTO } from './../shared/dto/article.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/shared/entities/Article.entity";
import { Repository } from "typeorm";
import { Category } from 'src/shared/entities/Category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepository.find({ 
      relations: ['article', 'article.category'],
      join: { alias: "article", leftJoinAndSelect: { category: "article.category" } }
    });
  }

  async getById(id: string): Promise<Article> {
    return this.articleRepository.findOne(id, { 
      relations: ['article', 'article.category'],
      join: { alias: "article", leftJoinAndSelect: { category: "article.category" } }
    });
  }

  async create({
    category, 
    content, 
    isMainArticle, 
    title, 
    slug,
    linkedArticles
  }: ArticleDTO): Promise<Article> {
    const article = new Article();

    article.category = await this.categoryRepository.findOne(category);
    article.content = content;
    article.isMainArticle = !!isMainArticle;
    article.title = title;
    article.slug = slug;
    article.linkedArticles = linkedArticles || [];

    return this.articleRepository.save(article);
  }

  async update(id: string, body: ArticleDTO): Promise<any> {
    return this.articleRepository.update(id, body);
  }

  async delete(id: string): Promise<any> {
    return this.articleRepository.delete(id);
  }
}
