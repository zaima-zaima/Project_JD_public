import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    goodsid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    oid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbs: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const value = this.getDataValue("thumbs");
        return JSON.parse(value);
      },
    },
    content: {
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
