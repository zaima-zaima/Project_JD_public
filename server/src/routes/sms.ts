import Express from "express";

import formatResponse from "../utils/response";

import sms from "../../configure/authKey/sms";
import getClientIp from "../utils/getIp";
import { fromTimeStampToStand } from "../utils/formatDate";
import { randomNumberGenerator } from "../utils/random";
import { sendSmS } from "../service/sms";

const router = Express();

router.post("/", async (req: any, res, next) => {
  try {
    await sendSmS(req.body.phone as string, req);
    res.send(formatResponse(0, "发送成功", true));
  } catch (err) {
    next(err);
  }
});

router.post("/verify", (req: any, res, next) => {
  if (!req.body.captcha || !req.body.phone) {
    res.send(formatResponse(400, "参数错误", false));
    return;
  }

  if (
    !req.session.captcha ||
    +req.session.captcha[req.body.phone] !== +req.body.captcha
  ) {
    res.send(formatResponse(402, "验证失败", false));
    return;
  }

  if (+req.session.captcha[req.body.phone] === +req.body.captcha) {
    res.send(formatResponse(0, "验证成功", true));
    return;
  }

  res.send(formatResponse(501, "未知错误", false));
});

export default router;
