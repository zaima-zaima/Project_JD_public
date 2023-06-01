import {
  deleteDepartment,
  dePartmentRegister,
  findAllDepartment,
  findDepartmentById,
  updateDepartment,
} from "../mysql/api/department";
import { Department } from "../types/Department";
import Error from "../utils/Error";

import departModel from "../mysql/model/department";

export async function fetchAllDeparment() {
  try {
    return await findAllDepartment();
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchDepartmentById(id: string) {
  if (!id) {
    throw new Error.Params("id参数有误");
  }

  try {
    return await findDepartmentById(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function departmentCreator(data: Department) {
  if (!data.name) {
    throw new Error.Params("name参数有误");
  }

  const depart = JSON.parse(
    JSON.stringify(
      await departModel.findOne({
        where: {
          name: data.name,
        },
      })
    )
  );

  if (depart) {
    throw new Error.Forbiden("该部门已存在，不能创建");
  }

  try {
    return await dePartmentRegister(data);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function departmentUpdator(id: string, data: Department) {
  if (!data.name) {
    throw new Error.Params("name参数有误");
  }

  const departTar = JSON.parse(
    JSON.stringify(
      await departModel.findOne({
        where: {
          name: data.name,
        },
      })
    )
  );

  if (departTar) {
    throw new Error.Forbiden("该部门名已存在，不能操作");
  }

  const depart = JSON.parse(JSON.stringify(await findDepartmentById(id)));

  if (depart === null) {
    throw new Error.Params();
  }

  try {
    return await updateDepartment(id, data);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function removeDepartment(id: string) {
  const depart = JSON.parse(JSON.stringify(await findDepartmentById(id)));

  if (depart === null) {
    throw new Error.Params();
  }

  try {
    return await deleteDepartment(id);
  } catch {
    throw new Error.UnkownError();
  }
}
