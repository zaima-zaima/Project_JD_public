import { Op } from "sequelize";
import { Admin } from "../../types/Admin";
import unique from "../../utils/unique";
import sequelize from "../connect";
import model from "../model/admin";
import { log } from "console";

type Order = "DESC" | "ASC";

type OrderCountBy = "days" | "count";

const attributes = [
  "id",
  "username",
  "status",
  "authLevel",
  "department",
  "leader",
  "senior",
  "transfer",
];

export async function findAllAdmin(filter, page?: number, limit?: number) {
  if (filter) {
    let sign;

    if (typeof filter === "string") {
      sign = JSON.parse(filter);
    } else {
      sign = filter;
    }

    if (sign.senior) {
      const admin = JSON.parse(
        JSON.stringify(await model.findByPk(sign.senior))
      );

      if (admin && (admin.username === "root" || admin.authLevel === 0)) {
        delete sign.senior;
      }
    }

    if (page && limit) {
      return await model.findAndCountAll({
        attributes,
        where: {
          ...sign,
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset: (page - 1) * limit,
      });
    }

    return await model.findAll({
      attributes,
      where: {
        ...sign,
      },
      order: [["createdAt", "DESC"]],
    });
  } else {
    if (page && limit) {
      return await model.findAndCountAll({
        attributes,
        limit,
        offset: (page - 1) * limit,
      });
    }

    return await model.findAll({
      attributes,
    });
  }
}

export async function findAdminById(id: string) {
  return await model.findByPk(id, {
    attributes,
  });
}

export async function findAdminCountByOrder(
  limit: number,
  order: Order,
  orderBy: OrderCountBy = "count"
) {
  const resp = (await sequelize.query(
    `select DATE_FORMAT(createdAt,'%Y-%m-%d') days,count(username) count from admin group by days`
  )) as any[];

  let array = [] as any[];

  for (let i = 0; i < resp.length; i++) {
    array = [...array, ...resp[i]];
  }

  array = unique(array, "days") as any[];

  if (orderBy === "count") {
    array.sort((a, b) => b.count - a.count);
  } else if (orderBy === "days") {
    array.sort(
      (a, b) => new Date(b.days).getTime() - new Date(a.days).getTime()
    );
  }

  if (array.length > limit) {
    array = array.slice(0, limit);
  }

  if (order === "ASC") {
    if (orderBy === "count") {
      array.sort((a, b) => a.count - b.count);
    } else if (orderBy === "days") {
      array.sort(
        (a, b) => new Date(a.days).getTime() - new Date(b.days).getTime()
      );
    }
  }

  return array;
}

export async function findOneAdmin(filter: Object) {
  return await model.findOne({
    attributes,
    where: {
      ...filter,
    },
  });
}

export async function findAdminByKeyword(keywords: string) {
  return await model.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      username: {
        [Op.like]: `%${keywords}%`,
      },
    },
  });
}

export async function adminCreator(adminObject: Admin) {
  const resp = await model.create({
    ...adminObject,
  });
  const admin = JSON.parse(JSON.stringify(resp));
  delete admin.password;
  return admin;
}

export async function updateAdmin(id: string, adminObject: Admin) {
  await model.update(
    {
      ...adminObject,
    },
    {
      where: {
        id,
      },
    }
  );

  return await model.findByPk(id, {
    attributes,
  });
}

export async function deleteAdmin(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}
