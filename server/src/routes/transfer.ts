import Express from "express";
import {
  createTransfer,
  fetchAllTransfer,
  fetchTransferById,
  transferUpdate,
} from "../service/transfer";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchAllTransfer(
      +(req.query.page as string),
      +(req.query.limit as string),
      req.query.filter as string
    );
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resp = await fetchTransferById(req.params.id);
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await createTransfer(req.body);
    res.send(formatResponse(0, "创建成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const resp = await transferUpdate(req.params.id, req.body);
    res.send(formatResponse(0, "更新成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
