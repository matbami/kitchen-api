import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const configuration  = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      "entities/**/*.js"
    ],
    migrations: [
      "migrations/**/*.js"
    ],
    cli: {
      "entitiesDir": "./entities",
      "migrationsDir": "./migrations"
    }
  }

  const appDataSource = new DataSource(configuration);
  export default appDataSource;
  