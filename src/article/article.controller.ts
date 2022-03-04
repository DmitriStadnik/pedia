import { Article } from './../shared/entities/Article.entity';
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('/article/')
export class ArticleController {
  constructor(public articleService: ArticleService) {}

  @Get()
  async getAll(): Promise<Article[]> {
    return await this.articleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Article> {
    return await this.articleService.getById(id);
  }

  @Post()
  async create(@Body() body: any): Promise<Article> {
    return await this.articleService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any): Promise<Article> {
    return await this.articleService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return await this.articleService.delete(id);
  }
}
