import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "discussion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    goodsid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    msg: {
      type: DataTypes.TEXT,
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
