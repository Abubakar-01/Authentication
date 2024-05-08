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
  let appData = AppDataSource.initialize()
    .then((y) => {
      console.log(`Data Source has been initialized at port! ${x.PORTDB}`);
      let userRepository = y.getRepository("User");
      return { userRepository: userRepository };
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  return appData;
};
