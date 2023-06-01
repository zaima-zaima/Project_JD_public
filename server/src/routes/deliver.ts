import Express from "express";
import {
  deliverDelete,
  deliverSetup,
  deliverUpdate,
  fetchDeliver,
} from "../service/deliver";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchDeliver(req.query.uid as string);
    res.send(formatResponse(0, "查询成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await deliverSetup(req.body);
    res.send(formatResponse(0, "添加成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const resp = await deliverUpdate(req.params.id, req.body);
    res.send(formatResponse(0, "更新成功", resp));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deliverDelete(req.params.id);
    res.send(formatResponse(0, "删除成功", true));
  } catch (err) {
    next(err);
  }
});

export default router;
