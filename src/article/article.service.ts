import { ArticleDTO } from './../shared/dto/article.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/shared/entities/Article.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getById(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }

  async create({
    category, 
    content, 
    isMainArticle, 
    title, 
    linkedArticles
  }: ArticleDTO): Promise<Article> {
    const article = new Article();

    article.category = category;
    article.content = content;
    article.isMainArticle = !!isMainArticle;
    article.title = title;
    article.linkedArticles = linkedArticles;

    return this.articleRepository.save(article);
  }

  async update(id: string, body: ArticleDTO): Promise<any> {
    return this.articleRepository.update(id, body);
  }

  async delete(id: string): Promise<any> {
    return this.articleRepository.delete(id);
  }
}
