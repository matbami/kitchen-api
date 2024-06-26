import express from "express";
import  MenuController  from "../controllers/menu.controller.js";

const menuRouter = express.Router();
console.log("lop")

menuRouter.post('', (req, res) => MenuController.createMenu(req, res));
menuRouter.patch('/:id', (req, res) => MenuController.updateMenuItem(req, res));
menuRouter.delete('/:id', (req, res) => MenuController.deleteMenuItem(req, res));
menuRouter.get('/:id', (req, res) => MenuController.getOneMenuItem(req, res));

export default menuRouter;
