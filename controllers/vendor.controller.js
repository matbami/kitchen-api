import VendorService from "../services/vendor.service.js";
class VendorController {
  constructor() {
    this.vendorService = VendorService;
  }

  async getAllVendors(req, res) {
    try {
      const vendors = await this.vendorService.getAllVendors();
      res
        .status(200)
        .json({ message: "Vendors retrieved successfully", vendors });
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
      res.json({ message: "Vendor retrieved successfully", vendor });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new VendorController();
