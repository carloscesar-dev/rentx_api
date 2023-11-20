import { Request, Response } from "express";

import { container } from "tsyringe";

import { UPloadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UPloadCarImagesUseCase);

    const image_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id: id, image_name });

    return response.status(201).send();
  }
}
