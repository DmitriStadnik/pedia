import { Article } from "../entities/Article.entity";

export class CategoryDTO {
  title?: string;
  articles?: Article[];
}