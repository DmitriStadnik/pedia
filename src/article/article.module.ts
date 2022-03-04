import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: []
})
export class ArticleModule { }
