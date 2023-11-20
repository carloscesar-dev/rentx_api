import { ICreateSpecificationsDTO } from "@modules/cars/dtos/ICreateSpecificationsDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationsRepository
{
  specification: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specification.push(specification);

    return specification;
  }
  async list(): Promise<Specification[]> {
    const all = this.specification;
    return all;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specification.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpefications = this.specification.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpefications;
  }
}
