import { DataSource, DataSourceOptions } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/DataSource";

type IDBOptions = DataSourceOptions & {
  host: string;
  database: string;
};

type TEnviroment = {
  test: string;
  dev: string;
};

type TDefaults = {
  [key in keyof TEnviroment]: {
    database: string;
    host: string;
  };
};

export const initializeDatabase = (): Promise<DataSource> => {
  const dbOptions = dataSource.options as IDBOptions;

  const environment: keyof TEnviroment =
    (process.env.NODE_ENV as keyof TEnviroment) || "dev";

  const defaults: TDefaults = {
    test: {
      database: "rentx_test",
      host: "localhost",
    },
    dev: {
      database: dbOptions.database,
      host: "database",
    },
  };

  return dataSource
    .setOptions({
      host: defaults[environment].host,
      database: defaults[environment].database,
    })
    .initialize();
};
