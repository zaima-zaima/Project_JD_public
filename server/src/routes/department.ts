import Express from "express";
import {
  departmentCreator,
  departmentUpdator,
  fetchAllDeparment,
  fetchDepartmentById,
  removeDepartment,
} from "../service/department";
import Error from "../utils/Error";
import formatResponse from "../utils/response";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    const resp = await fetchAllDeparment();
    res.send(formatResponse(0, "获取部门成功", resp));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resp = await fetchDepartmentById(req.params.id);
    if (resp === null) {
      throw new Error.NotFound("参数有误");
    }
    res.send(formatResponse(0, "获取部门成功", resp));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resp = await departmentCreator(req.body);
    res.send(formatResponse(0, "添加成功", resp));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const resp = await departmentUpdator(req.params.id, req.body);
    res.send(formatResponse(0, "修改成功", resp));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const resp = await removeDepartment(req.params.id);
    res.send(formatResponse(0, "删除成功", true));
  } catch (err) {
    next(err);
  }
});

export default router;
