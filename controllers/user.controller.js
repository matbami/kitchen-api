import userService from "../services/user.service.js";

class UserController {
  async register(req, res, next) {
    try {
      const user = await userService.register(req.body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllVendors(req, res, next) {
    try {
      const vendors = await userService.getAllVendors();
      res
        .status(200)
        .json({ message: "Vendors retrieved successfully", vendors });
    } catch (error) {
      next(error);
    }
  }

  async getOneVendor(req, res, next) {
    try {
      const vendor = await userService.getVendorById(req.params.id);
      res.json({ message: "Vendor retrieved successfully", vendor });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
