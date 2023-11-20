import request from "supertest";

import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { initializeDatabase } from "@shared/infra/typeorm";

import { app } from "@shared/infra/http/app";
import { DataSource } from "typeorm";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const id = uuidv4();
    const password = await hash("admin", 8);

    connection = await initializeDatabase();
    await connection.runMigrations();

    await connection.query(
      `INSERT INTO users(
        id, name, email, password, driver_license, is_admin, created_at      
      ) 
      VALUES (
        '${id}', 'admin', 'admin@rentx.com.br', '${password}', 'XXXXXXX', true, 'now()'
      )`
    );
  });

  it("should be able to create a new category", async () => {
    const authResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = authResponse.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Name Supertest",
        description: "Description Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const authResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = authResponse.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Name Supertest",
        description: "Description Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });
});
