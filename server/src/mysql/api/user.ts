import { Op } from "sequelize";
import model from "../model/user";
import roler from "../model/roler";
import { User } from "../../types/User";

const attributes = [
  "id",
  "username",
  "status",
  "credit",
  "phone",
  "role",
  "avatar",
  "baitiao",
];

export async function findOneUser(params: any) {
  const data = await model.findOne({
    where: {
      username: params.username,
      password: params.password,
    },
    include: {
      model: roler,
      as: "roler",
    },
  });

  if (!data) {
    return await model.findOne({
      where: {
        phone: params.username,
        password: params.password,
      },
      include: {
        model: roler,
        as: "roler",
      },
    });
  }

  return data;
}

export async function findOneUserByUsername(username: string) {
  return await model.findOne({
    where: {
      username,
    },
    include: {
      model: roler,
      as: "roler",
    },
  });
}

export async function findAllUser(
  page: number,
  limit: number,
  filter?: Object
) {
  if (filter) {
    return await model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      include: {
        model: roler,
        as: "roler",
      },
      where: {
        ...filter,
      },
      order: [["createdAt", "DESC"]],
      paranoid: false,
    });
  }

  return await model.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    include: {
      model: roler,
      as: "roler",
    },
    order: [["createdAt", "DESC"]],
    paranoid: false,
  });
}

export async function findOneUserById(id: string) {
  return await model.findByPk(id, {
    attributes,
    paranoid: false,
  });
}

export async function searchUser(keyword: string) {
  return await model.findAndCountAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    include: {
      model: roler,
      as: "roler",
    },
    order: [["createdAt", "DESC"]],
  });
}

export async function updateUser(uid: string, data: User) {
  return await model.update(data, {
    where: {
      id: uid,
    },
  });
}

export async function removeUser(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}

export async function restoreUser(id: string) {
  return await model.restore({
    where: {
      id,
    },
  });
}
