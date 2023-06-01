import Express from "express";
import { signUp } from "../service/register";
import response from "../utils/response";
import { checkUser } from "../service/user";
const router = Express.Router();
import roler from "../mysql/model/roler";
import Error from "../utils/Error";

router.post("/", async (req: any, res, next) => {
  if (
    !req.session.captcha ||
    +req.body.captcha !== +req.session.captcha[req.body.phone]
  ) {
    res.send(response(403, "验证码错误", null));
    return;
  }

  try {
    const resp = (await signUp(req.body)) as any;

    if (resp.forbid) {
      res.send(
        response(403, "注册失败", {
          data: false,
          reson: resp.reson,
        })
      );
      return;
    }

    await roler.increment("total", {
      where: {
        id: req.body.role,
      },
    });
    res.send(response(0, "注册成功", resp));
    req.session.captcha[req.body.phone] = null;
  } catch (err) {
    next(err);
  }
});

router.post("/checkUser", async (req, res, next) => {
  if (!req.body.username) {
    res.send(response(400, "参数错误", false));
    return;
  }

  const user = await checkUser(req.body.username);
  if (!user) {
    res.send(response(0, "用户可注册", true));
    return;
  }

  res.send(response(405, "用户名已被占用", false));
});

export default router;
