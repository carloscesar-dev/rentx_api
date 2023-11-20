import { jest } from "@jest/globals";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { ealMailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/ealMailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let ealMailProviderInMemory: ealMailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    ealMailProviderInMemory = new ealMailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      ealMailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMaill = jest.spyOn(ealMailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "658945",
      email: "teste@teste.com",
      name: "test",
      password: "123854",
    });

    await sendForgotPasswordMailUseCase.execute("teste@teste.com");

    expect(sendMaill).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("email@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user token", async () => {
    const generationToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "658945",
      email: "teste@teste.com",
      name: "test",
      password: "123854",
    });

    await sendForgotPasswordMailUseCase.execute("teste@teste.com");

    expect(generationToken).toBeCalled();
  });
});
