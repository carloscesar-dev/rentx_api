import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import swaggerfile from "../../../swagger.json";
import { initializeDatabase } from "@shared/infra/typeorm";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import upload from "@config/upload";

export const app = express();

app.use(express.json());
app.use("/rentx-docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

initializeDatabase();
