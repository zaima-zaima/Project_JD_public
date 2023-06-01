import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goodsId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    deliverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliverPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliverAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    deliverNo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  }
);

export default model;
