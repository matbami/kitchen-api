import VendorService from "../services/vendor.service.js";
class VendorController {
  constructor() {
    this.vendorService = VendorService;
  }

  async getAllVendors(req, res) {
    try {
      const vendors = await this.vendorService.getAllVendors();
      res.status(200).json(vendors);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOneVendor(req, res) {
    try {
      const vendor = await this.vendorService.getVendorById(req.params.id);
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new VendorController();
