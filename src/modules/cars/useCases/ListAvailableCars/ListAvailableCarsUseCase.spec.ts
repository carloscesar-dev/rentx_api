import "reflect-metadata";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car 1",
      brand: "Car brand 1",
      category_id: "33a1876d-1486-4c3b-8504-f677a551403a",
      daily_rate: 190,
      description: "Car description 1",
      fine_amount: 150,
      license_plate: "GFW-485D",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car 2",
      brand: "Car brand 2",
      category_id: "33a1876d-1486-4c3b-8504-f677a551403a",
      daily_rate: 190,
      description: "Car description 2",
      fine_amount: 150,
      license_plate: "GFW-454D",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car brand 2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car 3",
      brand: "Car brand 3",
      category_id: "33a1876d-1486-4c3b-8504-f677a551403a",
      daily_rate: 190,
      description: "Car description 3",
      fine_amount: 150,
      license_plate: "GFW-454D",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by categorie", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Car 3",
      brand: "Car brand 3",
      category_id: "33a1876d-1486-4c3b-8504-f677a551403a",
      daily_rate: 190,
      description: "Car description 3",
      fine_amount: 150,
      license_plate: "GFW-454D",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "33a1876d-1486-4c3b-8504-f677a551403a",
    });

    expect(cars).toEqual([car]);
  });
});
