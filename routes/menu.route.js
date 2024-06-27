import express from "express";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate, validateParams } from "../middlewares/validation.js";
import {
  createMenuSchema,
  menuIdSchema,
} from "../validations/menu.validations.js";
import { authorizeRole } from "../middlewares/auth.js";
import { role } from "../helper.js";

const menuRouter = express.Router();

menuRouter.post("",validate(createMenuSchema), (req, res) =>
  MenuController.createMenu(req, res)
);
menuRouter.patch(
  "/:id",
  validate(createMenuSchema),
  validate(menuIdSchema),
  (req, res) => MenuController.updateMenuItem(req, res)
);
menuRouter.delete(
  "/:id",
  validate(menuIdSchema),
  (req, res) => MenuController.deleteMenuItem(req, res)
);
menuRouter.get(
  "/:id",

  validateParams(menuIdSchema),
  (req, res) => MenuController.getOneMenuItem(req, res)
);

menuRouter.get(
    "",
    authenticateToken,
    authorizeRole(role.VENDOR),
    (req, res) => MenuController.getAllMenu(req, res)
  );

export default menuRouter;
