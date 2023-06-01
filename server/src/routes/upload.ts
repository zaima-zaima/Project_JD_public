import Express from "express";
const router = Express();
import path from "path";
import { findOneUserById } from "../mysql/api/user";
import { userUpdator } from "../service/user";
import { User } from "../types/User";
import formatResponse from "../utils/response";
import { generator } from "../utils/token";
import upload from "../utils/uploads";

(async function () {
  router.post(
    "/avatar/:uid",
    await (
      await upload(path.resolve(__dirname, "../../../uploads/avatar"))
    ).single("avatar"),
    async (req: any, res, next) => {
      if (!req.file?.filename) {
        return;
      }
      const user = JSON.parse(
        JSON.stringify(
          await userUpdator(req.params.uid, {
            avatar: `/imgs/avatar/${req.file?.filename}`,
          } as User)
        )
      );

      const data = JSON.parse(
        JSON.stringify(await findOneUserById(req.params.uid))
      ) as User;

      let userTokenGeneratorBase = {
        username: data.username,
        id: data.id,
        role: data.role,
        phone: data.phone,
        credit: data.credit,
        baitiao: data.baitiao,
        avatar: data.avatar,
      } as User;

      const authData = generator(userTokenGeneratorBase, 7);
      res.setHeader("authorization", "Bearer " + authData.token);

      res.send(
        formatResponse(0, "上传成功", {
          user,
          token: "Bearer " + authData.token,
        })
      );
    }
  );

  router.post(
    "/goods",
    await (
      await upload(path.resolve(__dirname, "../../../uploads/goods"))
    ).single("goods"),
    async (req: any, res, next) => {
      res.send(
        formatResponse(0, "上传成功", `/imgs/goods/${req.file?.filename}`)
      );
    }
  );

  router.post(
    "/comments",
    await (
      await upload(path.resolve(__dirname, "../../../uploads/comments"))
    ).single("comments"),
    async (req: any, res, next) => {
      res.send(
        formatResponse(0, "上传成功", `/imgs/comments/${req.file?.filename}`)
      );
    }
  );

  router.post(
    "/production",
    await (
      await upload(path.resolve(__dirname, "../../../uploads/production"))
    ).single("production"),
    async (req: any, res, next) => {
      res.send(
        formatResponse(0, "上传成功", `/imgs/production/${req.file?.filename}`)
      );
    }
  );
})();

export default router;
