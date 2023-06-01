import connect from "../connect";
import { DataTypes } from "sequelize";

const model = connect.define(
  "goods",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    back7day: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    baitiaoPay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    serviceSupport: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue("serviceSupport");
        if (!value) {
          return [];
        }

        return JSON.parse(value);
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jdStore: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingradient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approperate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue("tags");

        if (!value) {
          return [];
        }

        return JSON.parse(value);
      },
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue("keywords");

        if (!value) {
          return [];
        }

        return JSON.parse(value);
      },
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    thumbs: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue("thumbs");

        if (!value) {
          return [];
        }

        return JSON.parse(value);
      },
    },
    desc: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue("desc");
        if (!value) {
          return [];
        }
        return JSON.parse(value);
      },
    },
    owner: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
  }
);

export default model;
