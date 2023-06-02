import Express from "express";
import { fetchOverViewData } from "../service/overview";
import response from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const data = await fetchOverViewData();
    res.send(response(0, "获取成功", data));
  } catch (err) {
    next(err);
  }
});

export default router;
