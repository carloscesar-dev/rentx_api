import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateSpecificationsDTO } from "../dtos/ICreateSpecificationsDTO";

export interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
