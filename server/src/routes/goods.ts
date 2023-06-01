import Express from "express";

import {
  createGoods,
  fetchAllGoods,
  fetchGoodsById,
  fetchGoodsByRandom,
  fetchGoodsSoldCount,
  fetchGoodsSoldFrequentCount,
  goodsUpdate,
  removeGoods,
  searchGoods,
} from "../service/goods";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchAllGoods(
      +(req.query.page as string),
      +(req.query.limit as string)
    );
    res.send(formatResponse(0, "获取商品成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resp = await fetchGoodsById(req.params.id);
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/s/g", async (req, res, next) => {
  try {
    const resp = await searchGoods(
      req.query.keyword as string,
      +(req.query.page as string),
      +(req.query.limit as string)
    );
    res.send(formatResponse(0, "搜索成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/r/:length", async (req, res, next) => {
  try {
    const resp = await fetchGoodsByRandom(+(req.params.length as string));
    res.send(formatResponse(0, "获取随机商品成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/g/f", async (req, res, next) => {
  try {
    const data = await fetchGoodsSoldFrequentCount(
      +(req.query.limit as string)
    );

    res.send(formatResponse(0, "获取成功", data));
  } catch (err) {
    next(err);
  }
});

router.get("/g/c", async (req, res, next) => {
  try {
    const data = await fetchGoodsSoldCount(+(req.query.limit as string));

    res.send(formatResponse(0, "获取成功", data));
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const resp = await createGoods(req.body);
    res.send(formatResponse(0, "商品创建成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const resp = await goodsUpdate(req.params.id, req.body);
    res.send(formatResponse(0, "更新成功", resp));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const resp = await removeGoods(req.params.id);
    res.send(formatResponse(0, "删除成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
