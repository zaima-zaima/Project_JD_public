import path from "path";
import express from "express";
import session from "express-session";
import server from "../configure/server";
import { json } from "body-parser";
import { expressjwt as JWT, Request as JWTRequest } from "express-jwt";
import formatResponse from "./utils/response";
import Sms from "./routes/sms";
import Login from "./routes/login";
import User from "./routes/user";
import Category from "./routes/category";
import Goods from "./routes/goods";
import Cart from "./routes/cart";
import Area from "./routes/area";
import Deliver from "./routes/deliver";
import Order from "./routes/order";
import Pay from "./routes/pay";
import Department from "./routes/department";
import Admin from "./routes/admin";
import Uploads from "./routes/upload";
import Discussion from "./routes/discussion";
import Comment from "./routes/comment";
import Transfer from "./routes/transfer";
import Chat from "./routes/chat";
import OverView from "./routes/overview";
import { app, httpServer, io } from "./websoket/socket";

import sessionScure from "../configure/session";
import "./mysql/init";

//import routers

import Register from "./routes/signup";
import sha256 from "sha256";
import token from "../configure/authKey/jwt";
import ExpressAsyncError from "express-async-errors";
import axios from "axios";

//import routers

// jwt

app.use(
  JWT({
    secret: sha256(token.SecrectKey),
    algorithms: ["HS256"],
    credentialsRequired: true,
  }).unless({
    path: [
      { url: /\/imgs\/[\w]+/, methods: ["GET"] },

      { url: /\api\/sms/, method: "POST" },
      { url: "/api/login", method: "POST" },
      { url: /\/api\/signup[\w+]?/, method: "POST" },
      { url: "/api/login/whoami", method: "GET" },
      { url: /\/api\/goods\/s[\w\W]+/, method: "GET" },
      { url: /\/api\/goods\/([\w\W]+)?/, method: "GET" },
      { url: /\/api\/admin/, method: "POST" },
      { url: /\/api\/comment\/[\w\W]+/, method: "GET" },
      { url: /\/api\/discussion\?[\w\W]+/, method: "GET" },
      { url: "/api/login/github", method: "GET" },
      { url: /\/api\/login\/callback/, method: "POST" },
      { url: "/api/login/admin", method: "POST" },
      { url: "/api/department", method: "GET" },
      { url: /\/api\/admin([\w\W]+)?/, method: "GET" },
    ],
  }),
  (req, res, next) => {
    next();
  }
);

// static

const imgRoot = path.resolve(__dirname, "../../uploads");

app.use("/imgs", express.static(imgRoot));

app.use(
  session({
    secret: sessionScure.SESSION,
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
  })
);

app.use(json());
app.use("/api/signup", Register);
app.use("/api/sms", Sms);
app.use("/api/login", Login);
app.use("/api/user", User);
app.use("/api/goods/category", Category);
app.use("/api/goods", Goods);
app.use("/api/uploads", Uploads);
app.use("/api/cart", Cart);
app.use("/api/area", Area);
app.use("/api/deliver", Deliver);
app.use("/api/order", Order);
app.use("/api/pay", Pay);
app.use("/api/department", Department);
app.use("/api/admin", Admin);
app.use("/api/discussion", Discussion);
app.use("/api/comment", Comment);
app.use("/api/transfer", Transfer);
app.use("/api/chat", Chat);
app.use("/api/overview", OverView);

// 错误处理

app.use((err: any, req: any, res: any, next: any) => {
  res.send(formatResponse(err.code, err.msg, null));
});

// 错误处理

httpServer.listen(server.port, () => {
  console.log(`${server.port} is listening`);
});
