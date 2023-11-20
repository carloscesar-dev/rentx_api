import "reflect-metadata";

import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import { dataSource } from "../DataSource";

async function getConnection() {
  return dataSource.initialize();
}

async function create() {
  const connection = getConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await (
    await connection
  ).query(
    `INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [id, "Admin", "admin@email.com", "Admin", password, true, new Date()]
  );

  await (await connection).destroy();
}

create().then(() => console.log("User admin created!"));
