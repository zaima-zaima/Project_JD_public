import Express from "express";
import { fetchArea } from "../service/area";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchArea(req.query.parentId as string);
    res.send(formatResponse(0, "查询成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
