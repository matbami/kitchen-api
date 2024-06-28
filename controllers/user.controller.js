import userService from "../services/user.service.js";

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const user = await userService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).send(error.message);
    }
  }

  async getAllVendors(req,res) {
    try {
      const vendors = await userService.getAllVendors();
      res
        .status(200)
        .json({ message: "Vendors retrieved successfully", vendors });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneVendor(req, res) {
    try {
      const vendor = await userService.getVendorById(req.params.id);
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      res.json({ message: "Vendor retrieved successfully", vendor });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new UserController();
