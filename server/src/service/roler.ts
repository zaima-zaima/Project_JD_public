import {
  deleteRoler,
  findAllRoler,
  findRolerById,
  rolerCreator,
  rolerUpdate,
} from "../mysql/api/roler";
import Error from "../utils/Error";
import roler from "../mysql/model/roler";

export async function createRoler(name: string) {
  if (!name) {
    throw new Error.Params();
  }

  const rolerCollector = JSON.parse(
    JSON.stringify(await roler.findAll({ where: { name } }))
  );

  if (rolerCollector.length !== 0) {
    throw new Error.Forbiden("该角色已存在");
  }

  try {
    return await rolerCreator(name);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchAllRoler() {
  try {
    return await findAllRoler();
  } catch {
    throw new Error.UnkownError();
  }
}

export async function rolerUpdator(id: string, name: string) {
  if (!id || !name) {
    throw new Error.Params();
  }

  const rolerTar = JSON.parse(JSON.stringify(findRolerById(id)));
  if (!rolerTar) {
    throw new Error.Params("参数有误");
  }

  const rolerCollector = JSON.parse(
    JSON.stringify(await roler.findAll({ where: { name } }))
  );

  if (rolerCollector.length !== 0) {
    throw new Error.Forbiden("该角色已存在");
  }

  try {
    return await rolerUpdate(id, name);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function removeRoler(id: string) {
  if (!id) {
    throw new Error.Params();
  }

  const rolerTar = JSON.parse(JSON.stringify(await findRolerById(id)));
  if (!rolerTar) {
    throw new Error.Params("参数有误");
  }

  if (rolerTar.total !== 0) {
    throw new Error.Forbiden("禁止该操作");
  }

  try {
    const result = await deleteRoler(id);

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch {
    throw new Error.UnkownError();
  }
}
