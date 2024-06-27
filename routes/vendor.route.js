import express from "express";
import VendorController from "../controllers/vendor.controller.js";
import MenuController from "../controllers/menu.controller.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate, validateParams } from "../middlewares/validation.js";
import { vendorIdSchema } from "../validations/vendor.validations.js";
import { authorizeRole } from "../middlewares/auth.js";
import { role } from "../helper.js";
const vendorRouter = express.Router();

vendorRouter.get("", authenticateToken,  authorizeRole(role.CUSTOMER),(req, res) =>
  VendorController.getAllVendors(req, res)
);
vendorRouter.get(
  "/:id",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(vendorIdSchema),
  (req, res) => VendorController.getOneVendor(req, res)
);
vendorRouter.get(
  "/:id/menu",
  authenticateToken,
  authorizeRole(role.CUSTOMER),
  validateParams(vendorIdSchema),
  (req, res) => MenuController.getAllMenuByVendorForCustomers(req, res)
);



export default vendorRouter;
