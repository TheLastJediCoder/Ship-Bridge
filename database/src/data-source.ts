import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/users";
import "dotenv/config";
import { Orders } from "./entity/orders";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Users, Orders],
  migrations: [],
  subscribers: [],
});
