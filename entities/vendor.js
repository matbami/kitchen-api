import { EntitySchema } from "typeorm";

export const VendorSchema = new EntitySchema({
  name: "Vendor",
  tableName: "vendors",
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    address: {
      type: "text",
      nullable: false,
    },
  },
});
