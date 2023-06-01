import Express from "express";
import { addDiscussion, fetchDiscussion } from "../service/discussion";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchDiscussion(
      +(req.query.limit as string),
      req.query.goods as string
    );
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await addDiscussion(req.body);
    res.send(formatResponse(0, "添加成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
