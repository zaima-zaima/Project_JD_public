import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "transfer",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leader: {
      type: DataTypes.STRING,
    },
    actionFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    push: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    seniorTransfer: {
      type: DataTypes.STRING,
    },
    seniorFromDepartment: {
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
