import connect from "./connect";
import user from "./model/user";
import Roler from "./model/roler";
import server from "../../configure/server";
import admin from "./model/admin";
import sha256 from "sha256";
import "./model/category";
import "./model/goods";
import "./model/cart";
import "./model/area";
import "./model/deliver";
import "./model/order";
import department from "./model/department";
import { AdminStatus } from "../types/Admin";
import "./model/discussion";
import "./model/comment";
import "./model/transfer";
import path from "path";
import fs from "fs";
import { fetchAllRoler } from "../service/roler";
import { ResponseWithCount } from "../types/Response";

(async function () {
  user.hasOne(Roler, {
    foreignKey: "id",
    sourceKey: "role",
    as: "roler",
  });

  Roler.hasMany(user);

  await connect.sync({ alter: true });

  const root = await admin.findOne({
    where: {
      username: "root",
    },
  });

  if (!root) {
    try {
      await admin.create({
        username: "root",
        password: sha256(server.complexKey + server.rootPwd),
        authLevel: 0,
        status: "approved" as AdminStatus,
        senior: "null",
        department: "super",
      });
      console.log("创建root用户成功");
    } catch (e) {
      console.log("root用户创建失败，原因是" + e);
    }
  }

  const main = await department.findOne({
    where: {
      name: "主部门",
    },
  });

  if (!main) {
    try {
      await department.create({
        name: "主部门",
      });
      console.log("主部门创建成功");
    } catch (err) {
      console.log("主部门创建失败，原因是:", err);
    }
  }

  const roler = JSON.parse(
    JSON.stringify(await fetchAllRoler())
  ) as ResponseWithCount<any>;

  if (roler.rows.length === 0) {
    const resBusiness = JSON.parse(
      JSON.stringify(await Roler.create({ name: "商家" }))
    );
    const resUser = JSON.parse(
      JSON.stringify(await Roler.create({ name: "用户" }))
    );

    let str = `
      export default { user:"${resUser.id}",business:"${resBusiness.id}" }
    `;

    const filePath = path.resolve(__dirname, "../../configure/roler.ts");

    await fs.writeFileSync(filePath, str);
  }

  console.log("数据库模型初始化完成!");
})();
