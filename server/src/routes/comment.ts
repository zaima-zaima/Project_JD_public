import Express from "express";
import {
  addComment,
  fetchCommentByGoodsId,
  removeComment,
} from "../service/comment";
import { fetchOrderById } from "../service/order";
import { Order, OrderStatus } from "../types/order";
import { parser } from "../utils/parser";

import formatResponse from "../utils/response";

const router = Express();

router.get("/:gid", async (req, res, next) => {
  try {
    const resp = await fetchCommentByGoodsId(req.params.gid);
    res.send(formatResponse(0, "查询成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await addComment(req.body);
    res.send(formatResponse(0, "添加成功", resp));
  } catch (err) {
    next(err);
  }
});

router.delete("/:cid", async (req, res, next) => {
  try {
    return await removeComment(req.params.cid);
  } catch (err) {
    next(err);
  }
});

export default router;
