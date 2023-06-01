import sha from "sha256";
import server from "../../configure/server";
import { register } from "../mysql/api/register";
import Error from "../utils/Error";
import { searchUser } from "../mysql/api/user";

export async function signUp(user: any) {
  if (
    !user.username ||
    !user.password ||
    !user.role ||
    !user.phone ||
    !user.repassword
  ) {
    throw new Error.Params("参数缺失");
  }

  if (user.password !== user.repassword) {
    throw new Error.Params("两次密码输入不符,请检查后重试");
  }

  const findUser = JSON.parse(JSON.stringify(await searchUser(user.phone)));

  console.log(findUser);

  if (findUser.rows > 0) {
    throw new Error.Forbiden(
      "该手机号已存在，请换个手机号重试或直接使用此手机号进行登录"
    );
  }

  user.password = sha(user.password + server.complexKey);
  return await register(user);
}
