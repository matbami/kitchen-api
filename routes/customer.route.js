import express from "express";
import CustomerController from "../controllers/customer.controller.js";
import {
  loginSchema,
  registerSchema,
} from "../validations/customer.validations.js";
import { validate } from "../middlewares/validation.js";
const customRouter = express.Router();

customRouter.post("/register", validate(registerSchema), (req, res) =>
  CustomerController.register(req, res)
);
customRouter.post("/login", validate(loginSchema), (req, res) =>
  CustomerController.login(req, res)
);

export default customRouter;
