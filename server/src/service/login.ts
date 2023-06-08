import axios from "axios";
import qs from "qs";

import { dev, prod } from "../../configure/authKey/github";
import roler from "../../configure/roler";
import { findOneUserById } from "../mysql/api/user";
import { User } from "../types/User";
import { generator, verify } from "../utils/token";
import { signUp } from "./register";
import sha from "sha256";
import md5 from "md5";
import Error from "../utils/Error";
import sha256 from "sha256";
import server from "../../configure/server";
import { findUserByBase } from "./user";
import { fetchOneAdmin } from "./admin";
import { Admin } from "../types/Admin";
import reCAPTCHA from "../../configure/authKey/reCAPTCHA";
import { log } from "console";

export async function loginByGithub(code: string) {
  if (!code) {
    throw new Error.Params("缺少code参数");
  }

  try {
    const { data: token } = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.argv.includes("development")
            ? dev.client_id
            : prod.client_id,
          client_secret: process.argv.includes("development")
            ? dev.secrets
            : prod.secrets,
          code,
        },
      }
    );
    const { access_token } = qs.parse(token);

    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: "Bearer " + access_token,
      },
    });

    let user = {
      username: data.name,
      avatar: data.avatar_url,
      role: roler.user,
      id: md5(sha(String(data.id))),
    } as User;

    const userDetact = JSON.parse(
      JSON.stringify(await findOneUserById(md5(sha(String(data.id)))))
    ) as User;

    if (userDetact === null) {
      const register = JSON.parse(
        JSON.stringify(
          await signUp({
            ...user,
            phone: "default",
            password: "*",
            repassword: "*",
          })
        )
      ) as User;

      const u = JSON.parse(
        JSON.stringify(await findOneUserById(md5(sha(String(data.id)))))
      );

      if (u.status === "suspend") {
        throw new Error.Forbiden("你的账户已被冻结，详情请联系管理员");
      }

      user = {
        ...user,
        baitiao: register.baitiao,
        credit: register.credit,
        sym: "github",
      } as any;

      const authData = generator(user, 7);

      return {
        token: "Bearer " + authData.token,
        user: authData.user,
      };
    }

    // 登录成功，生成token

    user = {
      ...user,
      baitiao: userDetact.baitiao,
      credit: userDetact.credit,
      sym: "github",
    } as any;

    const authData = generator(user, 7);

    return {
      token: "Bearer " + authData.token,
      user: authData.user,
    };
  } catch {
    throw new Error.UnkownError();
  }
}

export async function loginByBase(body: any) {
  if (!body.username || !body.password) {
    throw new Error.Params();
  }

  if (!body.token) {
    throw new Error.Forbiden("请先进行人机认证");
  }

  const resp = await axios.post(
    `https://recaptcha.net/recaptcha/api/siteverify?secret=${reCAPTCHA.secretKey}&response=${body.token}`
  );

  if (!resp.data.success) {
    throw new Error.Forbiden("人机验证失败");
  }

  body.password = sha256(body.password + server.complexKey);

  const user = JSON.parse(JSON.stringify(await findUserByBase(body)));

  if (!user) {
    throw new Error.NotFound("请检查用户名或密码后重试!");
  }

  if (user.status === "suspend") {
    throw new Error.Forbiden("你的账户已被冻结，详情请联系管理员");
  }

  //生成token

  try {
    const authData = generator(
      {
        username: user.username,
        id: user.id,
        role: user.role,
        phone: user.phone,
        credit: user.credit,
        baitiao: user.baitiao,
        avatar: user.avatar,
      } as User,
      7
    );

    return {
      token: authData.token,
      user: authData.user,
    };
  } catch (err) {
    console.log(err);

    throw new Error.UnkownError();
  }
}

export async function adminLogin(body: any) {
  if (!body.username || !body.password) {
    throw new Error.Params();
  }

  //从数据库中查找用户

  body.password = sha256(server.complexKey + body.password);

  //生成token

  let user;

  try {
    user = JSON.parse(JSON.stringify(await fetchOneAdmin(body))) as Admin;
  } catch {
    throw new Error.UnkownError();
  }

  if (!user) {
    throw new Error.NotFound("请检查该用户名或密码后重试");
  }

  if (user.status === "pending") {
    throw new Error.Forbiden(
      "你的注册请求正在处理中，请等待超级管理员/leader批准后进行登录"
    );
  }

  if (user.status === "rejected") {
    throw new Error.Forbiden(
      "超级管理员/leader已拒绝了你的注册请求，如有疑问请联系你的leader"
    );
  }

  try {
    const authData = generator(
      {
        username: user.username,
        id: user.id,
        authLevel: user.authLevel,
      } as any,
      7
    );

    return {
      token: "Bearer " + authData.token,
      user: authData.user,
    };
  } catch {
    throw new Error.UnkownError();
  }
}

export async function whoami(token: string) {
  if (!token) {
    throw new Error.Params();
  }

  try {
    const result = verify(token) as User;

    if (result) {
      const user = JSON.parse(
        JSON.stringify(await findOneUserById(result.id as string))
      ) as User;

      if (user && user.role) {
        result.credit = user.credit;
      }

      return result;
    } else {
      throw new Error.Expire("token无效或已过期，请重新登录");
    }
  } catch (err) {
    throw new Error.UnkownError();
  }
}
