import {
  commentCreator,
  deleteComment,
  findCommentByGoodsId,
} from "../mysql/api/comment";
import { findOrderById } from "../mysql/api/order";
import { findOneUserById } from "../mysql/api/user";

import { Comment } from "../types/comment";
import { Order, OrderStatus } from "../types/order";
import { ResponseWithCount } from "../types/Response";
import { User } from "../types/User";
import { parser } from "../utils/parser";
import { fetchGoodsById } from "./goods";
import { updateOrder } from "./order";
import goodsModel from "../mysql/model/goods";
import Error from "../utils/Error";
import { Goods } from "../types/Goods";

export async function fetchCommentByGoodsId(
  gid: string,
  page: number = 1,
  limit: number = 10
) {
  try {
    const resp = parser(
      await findCommentByGoodsId(gid, page, limit)
    ) as unknown as ResponseWithCount<Comment>;

    for (let i = 0; i < resp.rows.length; i++) {
      resp.rows[i].user = parser(await findOneUserById(resp.rows[i].uid));
      resp.rows[i].order = parser(await findOrderById(resp.rows[i].oid));
    }

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function addComment(data: Comment) {
  if (
    !data.goodsid ||
    !data.uid ||
    !data.oid ||
    !data.star ||
    !data.thumbs ||
    !data.content
  ) {
    throw new Error.Params();
  }

  const order = JSON.parse(
    JSON.stringify(await findOrderById(data.oid))
  ) as Order;

  const user = JSON.parse(
    JSON.stringify(await findOneUserById(data.uid))
  ) as User;

  const goods = JSON.parse(
    JSON.stringify(await fetchGoodsById(data.goodsid))
  ) as Goods;

  if (order === null) {
    throw new Error.Params("参数oid有误，请重新检查参数后重试");
  }

  if (goods === null) {
    throw new Error.Params("参数goodsid有误，请重新检查参数后重试");
  }

  if (String(Number(data.star)) === "NaN") {
    throw new Error.Params("参数star格式有误，请检查后重试");
  }

  if (data.star < 1 || data.star > 5) {
    throw new Error.Params("参数star有误，取值范围为1-5");
  }

  if (order.status !== OrderStatus.done) {
    throw new Error.Forbiden("不支持该订单评论");
  }

  if (user === null) {
    throw new Error.Params("uid参数有误，请重新检查该参数后重试");
  }

  try {
    data.thumbs = JSON.stringify(data.thumbs);
    const resp = await commentCreator(data);
    await updateOrder(data.oid, { status: OrderStatus.complated } as any);
    await goodsModel.increment("comment", { where: { id: data.goodsid } });
    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function removeComment(cid: string) {
  try {
    return await deleteComment(cid);
  } catch (err) {
    throw new Error.UnkownError();
  }
}
