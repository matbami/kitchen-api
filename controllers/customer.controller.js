import customerService from "../services/customer.service.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper.js";

class CustomerController {
  async register(req, res) {
    try {
      const user = await customerService.register(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const user = await customerService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}

export default new CustomerController();
