import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataSource } from "../app.js";

export class UserController {
  static userRegistration = async (req, res) => {
    const { username, email, password, password_confirmation, policyAccepted } =
      req.body;
    const user = await dataSource?.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (
        username &&
        email &&
        password &&
        password_confirmation &&
        policyAccepted
      ) {
        if (password === password_confirmation) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          let user = await dataSource?.userRepository.save({
            username: username,
            password: hashPassword,
            email: email,
            policyAccepted: policyAccepted,
          });
          delete user["password"];
          res.status(201).send({ ...user });
        } else {
          res.send({ status: "failed", message: "Passwords doesn't match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };
}
