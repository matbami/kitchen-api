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

userRouter.post("/register", validate(registerSchema), (req, res, next) =>
  UserController.register(req, res, next)
);

userRouter.post("/login", validate(loginSchema), (req, res, next) =>
  UserController.login(req, res, next)
);

userRouter.get(
  "/vendors",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  (req, res, next) => UserController.getAllVendors(req, res, next)
);

userRouter.get(
  "/vendors/:id/menu",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(userIdSchema),
  (req, res, next) =>
    MenuController.getAllMenuByVendorForCustomers(req, res, next)
);
userRouter.get(
  "/vendors/menu",
  authenticateToken,
  authorizeRole(role.VENDOR),
  (req, res, next) => MenuController.getAllMenuForVendors(req, res, next)
);

userRouter.get(
  "/vendors/:id",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(userIdSchema),
  (req, res, next) => UserController.getOneVendor(req, res, next)
);

export default userRouter;
