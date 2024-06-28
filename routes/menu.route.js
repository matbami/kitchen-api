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
  (req, res) => MenuController.createMenu(req, res)
);
menuRouter.patch(
  "/:id",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validate(updateMenuSchema),
  validateParams(menuIdSchema),
  (req, res) => MenuController.updateMenuItem(req, res)
);
menuRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validateParams(menuIdSchema),
  (req, res) => MenuController.deleteMenuItem(req, res)
);
menuRouter.get(
  "/:id",
  authenticateToken,
  authorizeRole(role.VENDOR),
  validateParams(menuIdSchema),
  (req, res) => MenuController.getOneMenuItem(req, res)
);

menuRouter.get("", authenticateToken, authorizeRole(role.VENDOR), (req, res) =>
  MenuController.getAllMenu(req, res)
);

export default menuRouter;
