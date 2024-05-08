import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      required: true,
    },
    email: {
      type: "varchar",
      required: true,
    },
    password: {
      type: "varchar",
      required: true,
    },
    policyAccepted: {
      type: "bool",
      required: true,
    },
  },
});
