import "reflect-metadata";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name car",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name car1",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await expect(
      createCarUseCase.execute({
        name: "Name car2",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car2",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABD-1234",
    });

    expect(car.available).toBe(true);
  });
});
