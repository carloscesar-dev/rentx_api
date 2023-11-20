import { dataSource } from "@shared/infra/typeorm/DataSource";
import { Repository } from "typeorm";

import { Users } from "@modules/accounts/infra/typeorm/entities/Users";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = dataSource.getRepository(Users);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(user_id: string): Promise<Users> {
    const user = await this.repository.findOne({ where: { id: user_id } });

    return user;
  }
}
