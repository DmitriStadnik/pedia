import { Category } from '../shared/entities/Category.entity';
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/shared/dto/category.dto';
import { Public } from 'src/admin/public.guard';

@Controller('/category/')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @Public()
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  async create(@Body() body: CategoryDTO): Promise<Category> {
    return await this.categoryService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CategoryDTO): Promise<boolean> {
    return await this.categoryService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.delete(id);
  }
}
