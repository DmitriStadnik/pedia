import { Category } from 'src/shared/entities/Category.entity';
import { CategoryDTO } from './../shared/dto/category.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

  async create({title, slug}: CategoryDTO): Promise<Category> {
    const category = new Category();

    category.title = title;
    category.slug = slug;

    return this.categoryRepository.save(category);
  }

  async update(id: string, body: CategoryDTO): Promise<boolean> {
    const { affected } = await this.categoryRepository.update(id, body);

    return affected === 1;
  }

  async delete(id: string): Promise<any> {
    const { affected } = await this.categoryRepository.delete(id);

    return affected === 1;
  }
}
