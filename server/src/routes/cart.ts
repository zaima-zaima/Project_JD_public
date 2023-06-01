import Express from "express";
import { cartSetup, fetchCart } from "../service/cart";

import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchCart(req.query.uid as string);
    res.send(formatResponse(0, "购物车获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await cartSetup(req.body.cartList, req.body.uid);
    res.send(formatResponse(0, "购物车设置成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
