import express from "express";
const router = express.Router();
import { UserController } from "../controllers/userController.js";
import { checkUserAuth } from "../middleware/auth-middleware.js";

//Route level middleware
router.use("/changePassword", checkUserAuth);
//Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

//Private Routes
router.post("/changePassword", UserController.changeUserPassword);
export default router;
