import { Users } from "@modules/accounts/infra/typeorm/entities/Users";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UserRepositoryInMemory implements IUsersRepository {
  users: Users[] = [];

  async create({
    driver_license,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new Users();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<Users> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<Users> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}
