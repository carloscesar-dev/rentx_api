import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

import { Users } from "../infra/typeorm/entities/Users";

export class UserMapper {
  static toDTO({
    avatar,
    name,
    email,
    id,
    driver_license,
    getAvatarUrl: avatar_url,
  }: Users): IUserResponseDTO {
    const user = instanceToInstance({
      avatar,
      name,
      email,
      id,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
