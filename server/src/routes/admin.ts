import Express from "express";
import { findAdminCountByOrder } from "../mysql/api/admin";
import {
  adminRegistor,
  adminUpdator,
  fetchAdminById,
  fetchAdminByKeyword,
  fetchAllAdmin,
  removeAdmin,
} from "../service/admin";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchAllAdmin(
      req.query.filter,
      +(req.query.page as string),
      +(req.query.limit as string)
    );
    res.send(formatResponse(0, "获取所有管理员成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resp = await fetchAdminById(req.params.id);
    res.send(formatResponse(0, "获取所有管理员成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/o/orderBy", async (req, res, next) => {
  try {
    const resp = await findAdminCountByOrder(10, "ASC", "days");
    res.send(formatResponse(0, "", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/s/wd", async (req, res, next) => {
  try {
    const resp = await fetchAdminByKeyword(req.query.keywords as string);
    res.send(formatResponse(0, "搜索成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await adminRegistor(req.body);

    res.send(formatResponse(0, "注册成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const resp = await adminUpdator(req.params.id, req.body);
    res.send(formatResponse(0, "修改完成", resp));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await removeAdmin(req.params.id);
    res.send(formatResponse(0, "删除成功", true));
  } catch (err) {
    next(err);
  }
});

export default router;
