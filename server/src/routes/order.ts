import Express from "express";
import {
  fetchAllOrder,
  fetchAllOrderByUser,
  fetchOrderById,
  fetchOrderCountByUser,
  orderSetup,
  removeOrder,
  updateOrder,
} from "../service/order";
import formatResponse from "../utils/response";
import { generator } from "../utils/token";
import { User } from "../types/User";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchAllOrder(
      +(req.query.page as string),
      +(req.query.limit as string)
    );
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/u/:uid", async (req, res, next) => {
  try {
    let filter;

    if (!req.query.filter) {
      filter = {};
    } else {
      filter = JSON.parse(req.query.filter as string);
    }

    const resp = await fetchAllOrderByUser(
      req.params.uid,
      +(req.query.page as string),
      +(req.query.limit as string),
      filter
    );
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/o/:id", async (req, res, next) => {
  try {
    const resp = await fetchOrderById(req.params.id);
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await orderSetup(req.body);
    res.send(formatResponse(0, "添加成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { newUser, newOrder } = await updateOrder(req.params.id, req.body);
    const authData = generator(
      {
        username: newUser.username,
        id: newUser.id,
        role: newUser.role,
        phone: newUser.phone,
        credit: newUser.credit,
        baitiao: newUser.baitiao as any,
        avatar: newUser.avatar || null,
      } as User,
      7
    );

    res.setHeader("authorization", "Bearer " + authData.token);
    res.send(formatResponse(0, "更新成功", newOrder));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const resp = await removeOrder(req.params.id);
    res.send(formatResponse(0, "删除成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/c", async (req, res, next) => {
  try {
    const resp = await fetchOrderCountByUser(+(req.query.limit as string));
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
