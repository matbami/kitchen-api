import appDataSource from "../ormconfig.js";
import { MenuSchema } from "../entities/menu.js";
import { UserSchema } from "../entities/user.js";
import { customError } from "../customError.js";

class MenuService {
  constructor() {
    this.menuRepository = appDataSource.getRepository(MenuSchema);
    this.userRepository = appDataSource.getRepository(UserSchema);
  }
  async createMenuItem(menuDetails) {
    return await this.menuRepository.save(menuDetails);
  }

  async getMenuItemsByVendorId(id) {
    const vendor = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!vendor) {
      throw new customError("Vendor not found", 404);
    }
    return await this.menuRepository.find({
      where: {
        user: { id },
      },
      loadRelationIds: true,
      relations: ["user"],
    });
  }

  async getAllMenuItems(page, limit) {
    const skip = (page - 1) * limit;

    const [menu, totalMenu] = await this.menuRepository.findAndCount({
      loadRelationIds: true,
      relations: ["user"],
      skip: skip,
      take: limit,
    });

    return {
      menu,
      totalMenu,
      page,
    };
  }

  async getOneMenuItem(id) {
    const menu = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    if (!menu) {
      throw new customError("Menu not found", 404);
    }
    return menu;
  }

  async updateMenuItem(id, criteria) {
    await this.getOneMenuItem(id);

    return await this.menuRepository.update(id, criteria);
  }

  async deleteMenuItem(id) {
    await this.getOneMenuItem(id);
    return await this.menuRepository.delete(id);
  }
}

export default new MenuService();
