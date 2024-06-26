import express from "express";
import  VendorController  from "../controllers/vendor.controller.js";
import  MenuController  from "../controllers/menu.controller.js";

const vendorRouter = express.Router();

vendorRouter.get('', (req, res) => VendorController.getAllVendors(req, res));
vendorRouter.get('/:id', (req, res) => VendorController.getOneVendor(req, res));
vendorRouter.get('/:id/menu', (req, res) => MenuController.getAllMenuByVendor(req, res));

export default vendorRouter;
