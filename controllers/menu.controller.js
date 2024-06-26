import MenuService  from "../services/menu.service.js";
 class MenuController {
    constructor(){
        this.menuService = MenuService
    }
 
  async createMenu(req, res) {

    try {
      const menu = await this.menuService.createMenuItem(req.body);
      res.json(menu);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  }

  async getAllMenuByVendor(req, res) {
    try {
      const menu = await this.menuService.getMenuItems(req.params.id);
      res.json('menu retrieved successfully',menu);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneMenuItem(req, res) {
    try {
      const menu = await this.menuService.getOneMenuItem(req.params.id);
      res.status(200).json({message: 'menu retrieved successfully', menu});
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateMenuItem(req, res) {
    try {
      const menu = await this.menuService.updateMenuItem(req.params.id,req.body);
      res.json('menu updated successfully',menu);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteMenuItem(req, res) {
    try {
       await this.menuService.deleteMenuItem(req.params.id);
      res.status(204).send('Menu deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

//   async getAll(req, res) {
//     try {
//       const vendors = await vendorService.getAllVendors();
//       res.json(vendors);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }

//   async getById(req, res) {
//     try {
//       const vendor = await vendorService.getVendorById(req.params.id);
//       res.json(vendor);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
}

export default new MenuController();



