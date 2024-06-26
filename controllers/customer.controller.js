import customerService from "../services/customer.service.js";
import jwt from "jsonwebtoken";

class CustomerController {
  // constructor(){
  //     this.customerService = MenuService
  // }
  async register(req, res) {
    try {
      const customer = await customerService.register(req.body);
      res.json(customer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const customer = await customerService.login(req.body);
      if(!customer){
        throw new Error('User des not exist')
      }
      const token = jwt.sign({ id: customer.id }, process.env.JWT_TOKEN);
      res.json({ customer, token });
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}

export default new CustomerController();
