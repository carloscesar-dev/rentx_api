import { inject, injectable } from "tsyringe";

import { Users } from "@modules/accounts/infra/typeorm/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}
