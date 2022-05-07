import { ArticleDTO } from './../shared/dto/article.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/shared/entities/Article.entity';
import { Repository } from 'typeorm';
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
    slug,
    linkedArticles,
  }: ArticleDTO): Promise<Article> {
    const article = new Article();

    article.category = (
      await this.categoryRepository.findOne(category)
    )._id.toString();
    article.content = content;
    article.isMainArticle = !!isMainArticle;
    article.title = title;
    article.slug = slug;
    article.linkedArticles = linkedArticles
      ? linkedArticles.filter((article) => article)
      : [];
    article.createdAt = new Date();
    article.updatedAt = new Date();

    return this.articleRepository.save(article);
  }

  async update(
    id: string,
    { category, linkedArticles, ...body }: ArticleDTO,
  ): Promise<any> {
    const { affected } = await this.articleRepository.update(id, {
      ...body,
      category: (
        await this.categoryRepository.findOne(category)
      )._id.toString(),
      linkedArticles: linkedArticles
        ? linkedArticles.filter((article) => article)
        : [],
      updatedAt: new Date(),
    });

    return affected === 1;
  }

  async delete(id: string): Promise<any> {
    const { affected } = await this.articleRepository.delete(id);

    return affected === 1;
  }
}
