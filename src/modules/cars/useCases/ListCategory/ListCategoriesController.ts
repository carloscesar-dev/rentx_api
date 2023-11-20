import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCateriesUseCase = container.resolve(ListCategoriesUseCase);

    const listCategories = await listCateriesUseCase.execute();

    return response.json(listCategories);
  }
}
