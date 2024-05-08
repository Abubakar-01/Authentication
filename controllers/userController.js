import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataSource } from "../app.js";

class UserController {
  static userRegistration = async (req, res) => {
    const { username, email, password, password_confirmation, policyAccepted } =
      req.body;
    let userRepository = dataSource.getRepository("User");
  };
}
