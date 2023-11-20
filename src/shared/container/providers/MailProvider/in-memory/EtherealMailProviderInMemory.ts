import { IMailProvider } from "../IMailProvider";

export class EtherealMailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const message = this.message.push({
      to,
      subject,
      variables,
      path,
    });
    console.log(message);
  }
}
