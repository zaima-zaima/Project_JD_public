import { Deliver } from "../../types/Deliver";
import model from "../model/deliver";

export async function findDeliver(uid?: string) {
  if (uid) {
    return await model.findAll({
      where: {
        user: uid,
      },
      order: [["createdAt", "DESC"]],
    });
  }
  return await model.findAll();
}

export async function findDeliverById(id: string) {
  return await model.findByPk(id);
}

export async function createDeliver(body: Deliver) {
  return await model.create({
    ...body,
  });
}

export async function updateDeliver(id: string, body: Deliver) {
  return await model.update(
    {
      ...body,
    },
    {
      where: {
        id,
      },
    }
  );
}

export async function deleteDeliver(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}
