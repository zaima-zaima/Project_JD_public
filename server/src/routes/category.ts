import Express from "express";
import { addCategory, fetchCategoriesByParent } from "../service/category";
import formatResponse from "../utils/response";

const router = Express();

router.get("/g", async (req, res, next) => {
  try {
    const resp = await fetchCategoriesByParent(req.query.parent as string);
    res.send(formatResponse(0, "获取成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await addCategory(req.body);
    res.send(formatResponse(0, "创建成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
