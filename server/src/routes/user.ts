import Express from "express";
import {
  createRoler,
  fetchAllRoler,
  removeRoler,
  rolerUpdator,
} from "../service/roler";
import {
  baitiaoCreator,
  deleteUser,
  fetchAllUser,
  fetchUserByKeyword,
  findUserByBase,
  userRestore,
  userUpdator,
} from "../service/user";
import { User } from "../types/User";
import Error from "../utils/Error";

import formatResponse from "../utils/response";
import { generator } from "../utils/token";
import userModal from "../mysql/model/user";
import { parser } from "../utils/parser";

const router = Express();

router.get("/", async (req, res, next) => {
  try {
    if (req.query.filter) {
      req.query.filter = JSON.parse(req.query.filter as string);
    }

    const user = await fetchAllUser(
      +(req.query.page as string),
      +(req.query.limit as string),
      req.query.filter
    );

    res.send(formatResponse(0, "获取成功", user));
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const data = await fetchUserByKeyword(req.query.keyword as string);
    res.send(formatResponse(0, "查询成功", data));
  } catch (err) {
    next(err);
  }
});

router.post("/roler", async (req, res, next) => {
  try {
    const data = await createRoler(req.body.name);
    res.send(formatResponse(0, "角色创建成功", data));
  } catch (err) {
    next(err);
  }
});

router.post("/bt", async (req, res, next) => {
  try {
    const data = await baitiaoCreator(req.body.user);

    if (req.body.user) {
      let u = (await userModal.findByPk(req.body.user)) as unknown as User;
      u = JSON.parse(JSON.stringify(u));

      const authData = generator(
        {
          username: u.username,
          id: u.id,
          role: u.role,
          phone: u.phone,
          credit: u.credit,
          baitiao: u.baitiao,
          avatar: u.avatar,
        } as User,
        7
      );

      res.setHeader("authorization", "Bearer " + authData.token);

      res.send(
        formatResponse(200, `恭喜，开通成功,你获得的初始额度为${data}`, data)
      );
    }
  } catch (err) {
    next(err);
  }
});

router.get("/roler", async (req, res, next) => {
  try {
    const data = await fetchAllRoler();
    res.send(formatResponse(0, "查询成功", data));
  } catch (err) {
    next(err);
  }
});

router.put("/roler", async (req, res, next) => {
  try {
    const data = await rolerUpdator(req.body.id, req.body.name);
    res.send(formatResponse(0, "更新成功", true));
  } catch (err) {
    next(err);
  }
});

router.delete("/roler/:id", async (req, res, next) => {
  try {
    const data = await removeRoler(req.params.id);

    res.send(formatResponse(0, data ? "更新成功" : "更新失败", data));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = await userUpdator(req.params.id, req.body);
    res.send(formatResponse(0, "更新成功", true));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await deleteUser(req.params.id);
    res.send(formatResponse(0, data ? "删除成功" : "删除失败", data));
  } catch (err) {
    next(err);
  }
});

router.put("/restore/:id", async (req, res, next) => {
  try {
    const data = await userRestore(req.params.id);
    res.send(formatResponse(0, "恢复成功", data));
  } catch (err) {
    next(err);
  }
});

export default router;
