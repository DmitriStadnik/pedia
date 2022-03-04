import { CategoryDTO } from './../shared/dto/category.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/shared/entities/Category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getById(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async create({title, articles}: CategoryDTO): Promise<Category> {
    const category = new Category();

    category.title = title;
    category.articles = articles;

    return this.categoryRepository.save(category);
  }

  async update(id: string, body: CategoryDTO): Promise<any> {
    return this.categoryRepository.update(id, body);
  }

  async delete(id: string): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}
