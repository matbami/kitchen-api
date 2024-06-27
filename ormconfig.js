import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const configuration = {
  type: "mysql",
  url: process.env.URI,
  synchronize: true,
  logging: false,
  entities: ["entities/**/*.js"],
  migrations: ["migrations/**/*.js"],
  cli: {
    entitiesDir: "./entities",
    migrationsDir: "./migrations",
  },
};

const appDataSource = new DataSource(configuration);
export default appDataSource;
