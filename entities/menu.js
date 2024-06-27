import { EntitySchema, Timestamp } from "typeorm";

export const MenuSchema = new EntitySchema({
  name: "Menu",
  tableName: "menu",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    price: {
      type: "decimal",
      nullable: false,
    },
    createdAt: {
      type: Timestamp,
      createDate: true,
    },

    updatedAt: {
      type: Timestamp,
      updateDate: true,
    },
  },

  relations: {
    vendor: {
      type: "many-to-one",
      target: "Vendor",
      joinColumn: true,
    },
  },
});
