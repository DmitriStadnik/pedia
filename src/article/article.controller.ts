import { ArticleDTO } from './../shared/dto/article.dto';
import { Article } from './../shared/entities/Article.entity';
import { Controller, Get, Post, Body, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('/article/')
export class ArticleController {
  constructor(public articleService: ArticleService) {}

  @Get()
  async getAll(): Promise<Article[]> {
    return await this.articleService.getAll();
  }

  @Get('test-error')
  async test(): Promise<any> {
    throw new HttpException('Test', HttpStatus.INTERNAL_SERVER_ERROR);;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Article> {
    return await this.articleService.getById(id);
  }

  @Post()
  async create(@Body() body: ArticleDTO): Promise<Article> {
    return await this.articleService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ArticleDTO): Promise<boolean> {
    return await this.articleService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return await this.articleService.delete(id);
  }
}
