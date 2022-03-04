import { Category } from './../shared/entities/Category.entity';
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('/category/')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  async create(@Body() body: any): Promise<Category> {
    return await this.categoryService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any): Promise<Category> {
    return await this.categoryService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.delete(id);
  }
}
