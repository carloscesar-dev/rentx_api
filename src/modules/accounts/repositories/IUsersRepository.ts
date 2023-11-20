import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { Users } from "../infra/typeorm/entities/Users";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<Users>;
  findById(id: string): Promise<Users>;
}
