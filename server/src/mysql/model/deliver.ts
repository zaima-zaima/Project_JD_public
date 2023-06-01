import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "deliver",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    detail: {
      type: DataTypes.STRING,
    },
    default: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  }
);

export default model;
