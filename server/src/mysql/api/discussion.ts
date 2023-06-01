import { Discussion } from "../../types/Discussion";
import model from "../model/discussion";

export async function findDiscussion(limit: number, goods: string) {
  return await model.findAll({
    limit: limit,
    offset: 0,
    order: [["createdAt", "DESC"]],
    where: {
      goodsid: goods,
    },
  });
}

export async function insertDiscussion(data: Discussion) {
  return await model.create({
    ...data,
  });
}
