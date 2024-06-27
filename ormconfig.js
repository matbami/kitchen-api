import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const configuration = {
  type: "mysql",
  url: connectionString,
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
