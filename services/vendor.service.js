import appDataSource from "../ormconfig.js";
import { VendorSchema } from "../entities/vendor.js";

class VendorService {
  constructor() {
    this.vendorRepository = appDataSource.getRepository(VendorSchema);
  }

  async getAllVendors() {
    return await this.vendorRepository.find();
  }

  async getVendorById(id) {
    return await this.vendorRepository.findOne({
      where: {
        id,
      },
    });
  }
}

export default new VendorService();
