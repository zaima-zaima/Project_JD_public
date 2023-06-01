import sha256 from "sha256";
import server from "../../configure/server";
import {
  adminCreator,
  deleteAdmin,
  findAdminById,
  findAdminByKeyword,
  findAllAdmin,
  findOneAdmin,
  updateAdmin,
} from "../mysql/api/admin";
import department from "../mysql/model/department";
import { Admin } from "../types/Admin";
import Error from "../utils/Error";
import isType from "../utils/isType";
import { onRegistion } from "../websoket/socket";
import { fetchDepartmentById } from "./department";
import { ResponseWithCount } from "../types/Response";

export async function fetchAllAdmin(filter, page?: number, limit?: number) {
  try {
    const resp = JSON.parse(
      JSON.stringify(await findAllAdmin(filter, page, limit))
    ) as Admin[] | ResponseWithCount<Admin>;

    if (page && limit) {
      for (let i = 0; i < (resp as ResponseWithCount<Admin>).rows.length; i++) {
        const department = JSON.parse(
          JSON.stringify(
            await fetchDepartmentById(
              (resp as ResponseWithCount<Admin>).rows[i].department
            )
          )
        );

        let senior;
        if ((resp as ResponseWithCount<Admin>).rows[i].senior) {
          senior = JSON.parse(
            JSON.stringify(
              await findAdminById(
                (resp as ResponseWithCount<Admin>).rows[i].senior as string
              )
            )
          );
        } else {
          senior = { username: "无" };
        }

        (resp as ResponseWithCount<Admin>).rows[i].senior = senior;
        (resp as ResponseWithCount<Admin>).rows[i].department = department;
      }

      return resp;
    } else {
      for (let i = 0; i < (resp as Admin[]).length; i++) {
        const department = JSON.parse(
          JSON.stringify(await fetchDepartmentById(resp[i].department))
        );

        let senior;
        if (resp[i].senior) {
          senior = JSON.parse(
            JSON.stringify(await findAdminById(resp[i].senior as string))
          );
        } else {
          senior = { username: "无" };
        }

        resp[i].senior = senior;
        resp[i].department = department;
      }

      return resp;
    }
  } catch (err) {
    console.log(err);

    throw new Error.UnkownError();
  }
}

export async function fetchAdminById(id: string) {
  if (!id) {
    throw new Error.Params("id参数缺失");
  }

  let admin: Admin;

  try {
    admin = JSON.parse(JSON.stringify(await findAdminById(id))) as Admin;

    if (admin == null) {
      throw new Error.NotFound("你查找的用户不存在");
    }

    return admin;
  } catch (err: any) {
    if (err.code !== 404) {
      throw new Error.UnkownError();
    } else {
      throw err;
    }
  }
}

export async function fetchOneAdmin(filter: Admin) {
  try {
    return await findOneAdmin(filter);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchAdminByKeyword(keywords: string) {
  if (!keywords) {
    throw new Error.Params("缺少关键词参数");
  }

  try {
    return await findAdminByKeyword(keywords);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function adminRegistor(admin: Admin) {
  if (!admin.username || !admin.password || !admin.department) {
    throw new Error.Params();
  }

  const adminCheck = await fetchOneAdmin({
    username: admin.username,
  } as Admin);

  if (adminCheck) {
    throw new Error.Forbiden("用户已存在，请检查用户名并重新尝试");
  }

  admin.password = sha256(server.complexKey + admin.password);

  try {
    const resp = await adminCreator(admin);

    await department.increment("count", { where: { id: admin.department } });

    onRegistion(resp);

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function adminUpdator(id: string, admin: Admin) {
  if (!id || isType(admin) !== "object") {
    throw new Error.Params("id参数缺失");
  }

  const adminTarget = JSON.parse(JSON.stringify(await fetchAdminById(id)));

  if (adminTarget == null) {
    throw new Error.NotFound("该用户id不存在");
  }

  if (admin.department) {
    const department = JSON.parse(
      JSON.stringify(await fetchDepartmentById(admin.department))
    );

    if (!department) {
      throw new Error.NotFound("参数中的部门不存在");
    }
  }

  if (admin.senior) {
    const senior = JSON.parse(
      JSON.stringify(await fetchAdminById(admin.senior))
    );

    if (senior == null) {
      throw new Error.NotFound("参数中的上级不存在");
    }
  }

  const reg = /^(([A-z])|([0-9]))(\w+)$/g;

  if (admin.password && !reg.test(admin.password)) {
    throw new Error.Params("密码参数格式错误");
  }

  if (
    admin.password &&
    (admin.password.length <= 8 || admin.password.length >= 16)
  ) {
    throw new Error.Params("密码参数长度错误，长度在8-16位之间");
  }

  if (admin.authLevel && String(Number(admin.authLevel)) === "NaN") {
    throw new Error.Params("权级参数错误，必须为数字");
  }

  if (
    admin.status &&
    admin.status !== "approved" &&
    admin.status !== "banded" &&
    admin.status !== "pending" &&
    admin.status !== "rejected"
  ) {
    throw new Error.Params("状态参数错误");
  }

  try {
    await updateAdmin(id, admin);
    return await fetchAdminById(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function removeAdmin(id: string) {
  if (!id) {
    throw new Error.Params("却少用户id参数");
  }

  const admin = JSON.parse(JSON.stringify(fetchAdminById(id)));

  if (admin === null) {
    throw new Error.NotFound("该id无法匹配任何一个管理员");
  }

  try {
    return await deleteAdmin(id);
  } catch {
    throw new Error.UnkownError();
  }
}
