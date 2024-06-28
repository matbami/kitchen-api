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
        user: { id },
      },
      loadRelationIds: true,
      relations: ["user"],
    });
  }


  async getOneMenuItem(id) {
    return await this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateMenuItem(id, criteria) {
    return await this.menuRepository.update(id, criteria);
  }

  async deleteMenuItem(id) {
    return await this.menuRepository.delete(id);
  }
}

export default new MenuService();
