import { Comment } from "../../types/comment";
import model from "../model/comment";

export async function findCommentByGoodsId(gid: string) {
  return await model.findAndCountAll({
    where: {
      goodsid: gid,
    },
    order: [["createdAt", "DESC"]],
  });
}

export async function commentCreator(data: Comment) {
  console.log(data);

  return await model.create({
    ...data,
  });
}

export async function deleteComment(cid: string) {
  return await model.destroy({
    where: {
      id: cid,
    },
  });
}
