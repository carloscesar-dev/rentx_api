import fs from "fs";
import mime from "mime";
import { S3, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { resolve } from "path";

import { IStorageProvider } from "../IStorageProvider";
import upload from "@config/upload";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: "sa-east-1",
      credentials: {
        accessKeyId: "AKIARTE7AFKPRAR63MWG",
        secretAccessKey: "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",
      },
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client.send(
      new PutObjectCommand({
        Bucket: "rentx-rocketseat",
        Key: `${folder}/${file}`,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
    );

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: "rentx-rocketseat",
        Key: `${folder}/${file}`,
      })
    );
  }
}
