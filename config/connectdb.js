import { DataSource } from "typeorm";
import { User } from "../entities/user.js";

export const connectDb = async (x) => {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: x.HOST,
    port: x.PORTDB,
    username: x.USERNAMES,
    password: x.PASSWORD,
    database: x.DATABASE,
    entities: [User],
    synchronize: true,
  });
  AppDataSource.initialize()
    .then((y) => {
      console.log(`Data Source has been initialized at port! ${x.PORTDB}`);
      return y;
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};
