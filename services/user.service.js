import appDataSource from "../ormconfig.js";
import { UserSchema } from "../entities/user.js";
import bcrypt from "bcryptjs";
import { generateToken, role } from "../helper.js";

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
      throw new Error("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(
      userDetails.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid email or password");
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
      select: ["businessName", "address"],
    });
  }

  async getVendorById(id) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: ["businessName", "address"],
    });
  }
}

export default new UserService();
