import express from "express";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import {
  createMenuSchema,
  menuIdSchema,
} from "../validations/menu.validations.js";

const menuRouter = express.Router();

menuRouter.post("", authenticateToken, validate(createMenuSchema), (req, res) =>
  MenuController.createMenu(req, res)
);
menuRouter.patch(
  "/:id",
  authenticateToken,
  validate(createMenuSchema),
  validate(createMenuSchema),
  (req, res) => MenuController.updateMenuItem(req, res)
);
menuRouter.delete(
  "/:id",
  authenticateToken,
  validate(menuIdSchema),
  (req, res) => MenuController.deleteMenuItem(req, res)
);
menuRouter.get("/:id", authenticateToken, validate(menuIdSchema), (req, res) =>
  MenuController.getOneMenuItem(req, res)
);

export default menuRouter;
