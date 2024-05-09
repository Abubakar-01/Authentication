import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataSource } from "../app.js";
import { Console, error } from "console";

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

          //Generate jwt token
          const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30m" }
          );
          res.status(201).send({
            status: "Success",
            message: "Registration Successful",
            token: token,
          });
        } else {
          res.send({ status: "failed", message: "Passwords doesn't match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  //Static Method for login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await dataSource.userRepository.findOne({
          where: { email: email },
        });
        if (user) {
          const isSame = await bcrypt.compare(password, user.password);
          if (isSame) {
            const token = jwt.sign(
              { userId: user.userId },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "30m" }
            );
            res
              .status(200)
              .send({
                status: "Success",
                message: "Logged In Successfully",
                token: token,
              });
          } else {
            res.send({
              status: "failed",
              message: "Invalid User name or password",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "User with this email doesn't exist",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required!" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
