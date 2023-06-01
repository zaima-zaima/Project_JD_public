import Express from "express";

import formatResponse from "../utils/response";

import { dev, prod } from "../../configure/authKey/github";

import {
  adminLogin,
  loginByBase,
  loginByGithub,
  whoami,
} from "../service/login";

const router = Express();

router.get("/github", async (req, res) => {
  const path = `https://github.com/login/oauth/authorize?client_id=${
    process.argv.includes("development") ? dev.client_id : prod.client_id
  }`;
  res.send(formatResponse(0, "", path));
});

router.post("/callback", async (req, res, next) => {
  try {
    const resp = await loginByGithub(req.body.code as string);
    res.setHeader("authorization", resp.token);
    res.send(formatResponse(0, "登录成功", resp.user));
  } catch (err: any) {
    // 捕获错误

    next(err);
  }
});

// 根据基础信息登录

router.post("/", async (req: any, res, next) => {
  try {
    const resp = await loginByBase(req.body);
    res.setHeader("authorization", "Bearer " + resp.token);
    res.send(formatResponse(0, "登录成功", resp.user));
  } catch (err: any) {
    next(err);
  }
});

router.post("/admin", async (req: any, res, next) => {
  try {
    const resp = await adminLogin(req.body);
    res.setHeader("authorization", resp.token);
    res.send(formatResponse(0, "登录成功", resp.user));
  } catch (err: any) {
    // 捕获错误
    next(err);
  }
});

router.get("/whoami", async (req, res, next) => {
  console.log("whoami");

  try {
    const token = req.headers["authorization"] as string;
    const resp = await whoami(token);
    res.send(formatResponse(0, "恢复登录成功", resp));
  } catch (err) {
    next(err);
  }
});

export default router;
