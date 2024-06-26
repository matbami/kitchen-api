import { EntitySchema } from "typeorm";
import bcrypt from "bcryptjs";

export const CustomerSchema = new EntitySchema({
  name: "Customer",
  tableName: "customers",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
  },

  beforeInsert: async (entity) => {
    entity.password = await bcrypt.hash(entity.password, 10);
  },
});
