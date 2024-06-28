import { EntitySchema } from "typeorm";
import bcrypt from "bcryptjs";

export const UserSchema = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    firstName: {
      type: "varchar",
      nullable: false,
    },
    lastName: {
      type: "varchar",
      nullable: false,
    },
    businessName: {
      type: "varchar",
      nullable: true,
    },
    address: {
      type: "varchar",
      nullable: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
      nullable: false
    },

    role: {
      type: "enum",
      enum: ["customer", "vendor"],
      default: "customer",
    },
  },
});
