import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: []
})
export class CategoryModule { }
