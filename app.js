import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDb } from "./config/connectdb.js";
import cors from "cors";
const app = express();
const port = process.env.PORT;

export const dataSource = connectDb(process.env);

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
