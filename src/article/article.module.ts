import { Category } from 'src/shared/entities/Category.entity';
import { Article } from 'src/shared/entities/Article.entity';
import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([Article, Category])],
  exports: [TypeOrmModule]
})
export class ArticleModule { }
