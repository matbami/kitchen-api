import MenuService from "../services/menu.service.js";
class MenuController {
  constructor() {
    this.menuService = MenuService;
  }

  async createMenu(req, res) {
    try {
      const menu = await this.menuService.createMenuItem(req.body);
      res.status(201).json({ message: "Menu created successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllMenuByVendorForCustomers(req, res) {
    try {
      const menu = await this.menuService.getMenuItems(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllMenu(req, res) {
    try {
      const menu = await this.menuService.getMenuItems(req.user.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneMenuItem(req, res) {
    try {
      const menu = await this.menuService.getOneMenuItem(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateMenuItem(req, res) {
    try {
      const menu = await this.menuService.updateMenuItem(
        req.params.id,
        req.body
      );
      res.json({ message: "Menu updated successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteMenuItem(req, res) {
    try {
      await this.menuService.deleteMenuItem(req.params.id);
      res.status(204).send("Menu deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new MenuController();
