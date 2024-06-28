import express from "express";
import UserController from "../controllers/user.controller.js";
import MenuController from "../controllers/menu.controller.js";
import {
  loginSchema,
  registerSchema,
} from "../validations/user.validations.js";
import { validate, validateParams } from "../middlewares/validation.js";
import { userIdSchema } from "../validations/user.validations.js";
import { authenticateToken, authorizeRole } from "../middlewares/auth.js";
import { role } from "../helper.js";

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), (req, res) =>
  UserController.register(req, res)
);

userRouter.post("/login", validate(loginSchema), (req, res) =>
  UserController.login(req, res)
);

userRouter.get(
  "/vendors",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  (req, res) => UserController.getAllVendors(req, res)
);

userRouter.get(
  "/vendors/:id",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(userIdSchema),
  (req, res) => UserController.getOneVendor(req, res)
);
userRouter.get(
  "/vendors/:id/menu",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(userIdSchema),
  (req, res) => MenuController.getAllMenuByVendorForCustomers(req, res)
);

export default userRouter;
