import { Category } from "../infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
