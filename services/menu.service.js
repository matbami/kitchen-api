import appDataSource from "../ormconfig.js";
import { MenuSchema } from "../entities/menu.js";


class MenuService {
  constructor() {
    this.menuRepository = appDataSource.getRepository(MenuSchema);
  }
  async createMenuItem(menuDetails) {

    const k = menuDetails.userId
    console.log(k)

    const menu = this.menuRepository.create({
      ...menuDetails,
      k,
    });

    return await this.menuRepository.save(menu);
   
  }

  async getMenuItemsByVendorId(id) {
    return await this.menuRepository.find({
      where: {
        userId: id,
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
    return await this.menuRepository.update(id, criteria);
    
  }

  async deleteMenuItem(id) {
    return await this.menuRepository.delete(id);
  }
}

export default new MenuService();
