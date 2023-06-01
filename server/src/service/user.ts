import {
  findAllUser,
  findOneUser,
  findOneUserById,
  findOneUserByUsername,
  removeUser,
  restoreUser,
  searchUser,
  updateUser,
} from "../mysql/api/user";
import Error from "../utils/Error";

import userModal from "../mysql/model/user";
import rolerModal from "../mysql/model/roler";
import { User, UserStatus } from "../types/User";
import { randomNumberGenerator } from "../utils/random";
import { findRolerById } from "../mysql/api/roler";

export async function findUserByBase(userInfo) {
  return await findOneUser(userInfo);
}

export async function checkUser(username: string) {
  return await findOneUserByUsername(username);
}

export async function baitiaoCreator(user: string) {
  if (!user) {
    throw new Error.Params();
  }

  const u = (await userModal.findByPk(user)) as unknown as User;

  if (!u) {
    throw new Error.NotFound("该用户不存在");
  }

  if (u.credit < 600) {
    throw new Error.Forbiden(
      "你的信用值不够，需要信用值到达600才可以开通，目前你的信用值为" + u.credit
    );
  }

  if (u.baitiao !== null) {
    throw new Error.Forbiden("你目前已经获得额度了，无法进行该操作");
  }

  const nums = randomNumberGenerator(1000, 20000);
  const resp = await userModal.update(
    { baitiao: nums },
    {
      where: {
        id: user,
      },
    }
  );
  if (!resp[0]) {
    throw new Error.UnkownError();
  }

  return nums;
}

export async function fetchAllUser(page: number, limit: number, filter?: any) {
  if (!page || !limit) {
    throw new Error.Params();
  }

  try {
    return await findAllUser(page, limit, filter);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchUserByKeyword(keyword: string) {
  try {
    return await searchUser(keyword);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function userUpdator(id: string, data: User) {
  if (!data) {
    throw new Error.Params("参数缺失");
  }

  const user = JSON.parse(JSON.stringify(await findOneUserById(id))) as User;

  if (user === null) {
    throw new Error.Params("id参数有误");
  }

  if (user.status === UserStatus.determine) {
    throw new Error.Forbiden("禁止此操作");
  }

  if (
    data.status &&
    data.status !== UserStatus.normal &&
    data.status !== UserStatus.suspend &&
    data.status !== UserStatus.determine &&
    data.status !== UserStatus.restore
  ) {
    throw new Error.Params("status参数有误");
  }

  if (
    data.status === UserStatus.restore &&
    user.status !== UserStatus.suspend
  ) {
    throw new Error.Forbiden("禁止此操作");
  }

  if (data.role) {
    const roler = JSON.parse(JSON.stringify(await findRolerById(data.role)));
    if (!roler) {
      throw new Error.Params("role参数有误");
    }

    try {
      await rolerModal.decrement("total", {
        where: {
          id: user.role,
        },
      });

      await rolerModal.increment("total", {
        where: {
          id: data.role,
        },
      });
    } catch {
      throw new Error.UnkownError();
    }
  }

  if (data.credit && String(+data.credit) === "NaN") {
    throw new Error.Params("credit参数有误");
  }

  try {
    return await updateUser(id, data);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function deleteUser(id: string) {
  if (!id) {
    throw new Error.Params("id 参数缺失");
  }

  const user = JSON.parse(JSON.stringify(findOneUserById(id)));

  if (!user) {
    throw new Error.Params("id参数有误");
  }

  try {
    return await removeUser(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function userRestore(id: string) {
  if (!id) {
    throw new Error.Params("id参数缺失");
  }

  const user = JSON.parse(JSON.stringify(await findOneUserById(id)));

  if (!user) {
    throw new Error.Params("id参数有误");
  }

  try {
    await restoreUser(id);
  } catch {
    throw new Error.UnkownError();
  }
}
