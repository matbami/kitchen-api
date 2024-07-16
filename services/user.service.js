import appDataSource from "../ormconfig.js";
import { UserSchema } from "../entities/user.js";
import bcrypt from "bcryptjs";
import { generateToken, role } from "../helper.js";
import { customError } from "../customError.js";

class UserService {
  constructor() {
    this.userRepository = appDataSource.getRepository(UserSchema);
  }
  async register(userDetails) {
    userDetails.password = await bcrypt.hash(userDetails.password, 10);
    const user = await this.userRepository.save(userDetails);

    delete user.password;
    const token = generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(userDetails) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDetails.email,
      },
    });
    if (!user) {
      throw new customError("Invalid email or password", 401);
    }
    const validPassword = await bcrypt.compare(
      userDetails.password,
      user.password
    );
    if (!validPassword) {
      throw new customError("Invalid email or password", 401);
    }
    delete user.password;

    const token = generateToken(user);
    return {
      user,
      token,
    };
  }

  async getAllVendors() {
    return await this.userRepository.find({
      where: {
        role: role.VENDOR,
      },
      select: ["id", "businessName", "address"],
    });
  }

  async getVendorById(id) {
    const vendor = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ["id", "businessName", "address"],
    });
    if (!vendor) {
      throw new customError("Vendor not found", 404);
    }

    return vendor;
  }
}

export default new UserService();
