import appDataSource from "../ormconfig.js";
import { CustomerSchema } from "../entities/customer.js";
import bcrypt from "bcryptjs";

class CustomerService {
  constructor() {
    this.customerRepository = appDataSource.getRepository(CustomerSchema);
  }
  async register(customerDetails) {
    
    customerDetails.password = await bcrypt.hash(customerDetails.password,10)
    return await this.customerRepository.save(customerDetails);
  }

  async login(customerDetails) {
    console.log(customerDetails)
    const customer = await this.customerRepository.findOne({
        where:{
            email: customerDetails.email
        }
    });
    if (!customer) {
      throw new Error("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(customerDetails.password, customer.password);
    if (!validPassword) {
      throw new Error("Invalid email or password");
    }
    return customer;
  }





}

export default new CustomerService();
