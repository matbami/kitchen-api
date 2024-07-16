import express from "express";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate, validateParams } from "../middlewares/validation.js";
import {
  createMenuSchema,
  menuIdSchema,
  updateMenuSchema,
} from "../validations/menu.validations.js";
import { authorizeRole } from "../middlewares/auth.js";
import { role } from "../helper.js";

const menuRouter = express.Router();

menuRouter.post(
  "",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validate(createMenuSchema),
  (req, res, next) => MenuController.createMenu(req, res, next)
);
menuRouter.patch(
  "/:id",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validate(updateMenuSchema),
  validateParams(menuIdSchema),
  (req, res, next) => MenuController.updateMenuItem(req, res, next)
);
menuRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validateParams(menuIdSchema),
  (req, res, next) => MenuController.deleteMenuItem(req, res, next)
);
menuRouter.get(
  "/:id",
  authenticateToken,
  validateParams(menuIdSchema),
  (req, res, next) => MenuController.getOneMenuItem(req, res, next)
);

menuRouter.get("", authenticateToken, authorizeRole(role.CUSTOMER), (req, res, next) =>
  MenuController.getAllMenuItems(req, res, next)
);

export default menuRouter;
