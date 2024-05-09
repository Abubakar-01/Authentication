import jwt from "jsonwebtoken";
import { dataSource } from "../app.js";

export const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization) {
    if (authorization && authorization.startsWith("Bearer")) {
      try {
        token = authorization.split(" ")[1];

        //Verify Token
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //Get user from token
        let user = await dataSource.userRepository.findOne({
          where: { userId: userId },
        });
        delete user["password"];
        req.user = user;
        next();
      } catch (err) {
        res.status(401).send({ status: "Unauthorized User" });
      }
    }
  } else {
    res.status(401).send({
      status: "failed",
      message: "There is no authorization token",
    });
  }
};
