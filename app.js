import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDb } from "./config/connectdb.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT;

export const dataSource = await connectDb(process.env);

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
