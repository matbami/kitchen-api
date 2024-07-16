import menuService from "../services/menu.service.js";
class MenuController {
  async createMenu(req, res, next) {
    try {
      const body = req.body;
      body.user = req.user.id;
      const menu = await menuService.createMenuItem(body);
      res.status(201).json({ message: "Menu created successfully", menu });
    } catch (error) {
      next(error);
    }
  }

  async getAllMenuByVendorForCustomers(req, res, next) {
    try {
      const menu = await menuService.getMenuItemsByVendorId(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      next(error);
    }
  }

  async getAllMenuForVendors(req, res, next) {
    try {
      const menu = await menuService.getMenuItemsByVendorId(req.user.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      next(error);
    }
  }

  async getAllMenuItems(req, res, next) {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const data = await menuService.getAllMenuItems(page, limit);
      res.status(200).json({ message: "Menu retrieved successfully", data });
    } catch (error) {
      next(error);
    }
  }

  async getOneMenuItem(req, res, next) {
    try {
      const menu = await menuService.getOneMenuItem(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      next(error);
    }
  }

  async updateMenuItem(req, res, next) {
    try {
      const menu = await menuService.updateMenuItem(req.params.id, req.body);
      res.status(200).json({ message: "Menu updated successfully", menu });
    } catch (error) {
      next(error);
    }
  }

  async deleteMenuItem(req, res, next) {
    try {
      await menuService.deleteMenuItem(req.params.id);
      res.status(204).json({ message: "Menu deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new MenuController();
