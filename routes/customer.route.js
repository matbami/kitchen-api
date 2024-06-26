import express from "express";
import  CustomerController  from "../controllers/customer.controller.js";

const customRouter = express.Router();

customRouter.post('/register', (req, res) => CustomerController.register(req, res));
customRouter.post('/login', (req, res) => CustomerController.login(req, res));

export default customRouter;
