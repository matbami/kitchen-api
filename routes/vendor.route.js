import express from "express";
import VendorController from "../controllers/vendor.controller.js";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { vendorIdSchema } from "../validations/vendor.validations.js";
const vendorRouter = express.Router();

vendorRouter.get("", authenticateToken, (req, res) =>
  VendorController.getAllVendors(req, res)
);
vendorRouter.get(
  "/:id",
  authenticateToken,
  validate(vendorIdSchema),
  (req, res) => VendorController.getOneVendor(req, res)
);
vendorRouter.get(
  "/:id/menu",
  authenticateToken,
  validate(vendorIdSchema),
  (req, res) => MenuController.getAllMenuByVendor(req, res)
);

export default vendorRouter;
