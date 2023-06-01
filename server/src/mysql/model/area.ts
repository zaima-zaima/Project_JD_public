import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "area",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    area_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    parent_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
  }
);

export default model;
