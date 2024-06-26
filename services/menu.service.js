import appDataSource from "../ormconfig.js";
import { MenuSchema } from "../entities/menu.js";

class MenuService {
  constructor() {
    this.menuRepository = appDataSource.getRepository(MenuSchema);
  }
  async createMenuItem(menuDetails) {
    return await this.menuRepository.save(menuDetails);
  }

  async getMenuItemsByVendorId(id) {
    return await this.menuRepository.find({
      where: {
        vendorId: id,
      },
    });
  }

  async getMenuItems() {
    return await this.menuRepository.find();
  }

  async getOneMenuItem(id) {
    return await this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateMenuItem(id, criteria) {
    return await this.menuRepository.update(criteria, id);
  }

  async deleteMenuItem(id) {
    return await this.menuRepository.delete(id);
  }
}

export default new MenuService();
