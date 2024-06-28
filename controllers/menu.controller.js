import menuService from "../services/menu.service.js";
class MenuController {
  async createMenu(req, res) {
    try {
      const body = req.body;
      body.user = req.user.id;
      const menu = await menuService.createMenuItem(body);
      res.status(201).json({ message: "Menu created successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllMenuByVendorForCustomers(req, res) {
    try {
      const menu = await menuService.getMenuItemsByVendorId(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllMenu(req, res) {
    try {
      const menu = await menuService.getMenuItemsByVendorId(req.user.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneMenuItem(req, res) {
    try {
      const menu = await menuService.getOneMenuItem(req.params.id);
      res.status(200).json({ message: "Menu retrieved successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateMenuItem(req, res) {
    try {
      const menu = await menuService.updateMenuItem(req.params.id, req.body);
      res.json({ message: "Menu updated successfully", menu });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteMenuItem(req, res) {
    try {
      await menuService.deleteMenuItem(req.params.id);
      res.status(204).send("Menu deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new MenuController();
