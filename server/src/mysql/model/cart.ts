import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cart: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue("cart");
        return JSON.parse(value);
      },
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  }
);

export default model;
