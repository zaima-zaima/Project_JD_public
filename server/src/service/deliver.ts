import {
  createDeliver,
  deleteDeliver,
  findDeliver,
  updateDeliver,
} from "../mysql/api/deliver";

import area from "../mysql/model/area";
import Area from "../types/Area";
import areaModel from "../mysql/model/area";
import deliverModel from "../mysql/model/deliver";

import { Deliver } from "../types/Deliver";
import Error from "../utils/Error";
import { findOneUserById } from "../mysql/api/user";
import isType from "../utils/isType";

export async function fetchDeliver(uid: string) {
  try {
    const resp = (await findDeliver(uid)) as unknown as Deliver[];
    let city: Area | null = null;
    let userArea: Area | null = null;
    for (let i = 0; i < resp.length; i++) {
      const province = JSON.parse(
        JSON.stringify(await area.findByPk(resp[i].province))
      ) as Area;

      if (resp[i].city) {
        city = JSON.parse(
          JSON.stringify(await area.findByPk(resp[i].city))
        ) as Area;
      }

      if (resp[i].area) {
        userArea = JSON.parse(
          JSON.stringify(await area.findByPk(resp[i].area))
        ) as Area;
      }

      resp[i].province = {
        id: province.id,
        name: province.area_name,
      } as any;

      if (city) {
        resp[i].city = {
          id: city.id,
          name: city.area_name,
        } as any;
      }

      if (userArea) {
        resp[i].area = {
          id: userArea.id,
          name: userArea.area_name,
        } as any;
      }
    }

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function deliverSetup(deliver: Deliver) {
  if (
    !deliver.user ||
    !deliver.province ||
    !deliver.detail ||
    deliver.default === undefined ||
    !deliver.name ||
    !deliver.phone
  ) {
    throw new Error.Params();
  }

  const user = JSON.parse(JSON.stringify(await findOneUserById(deliver.user)));

  if (user === null) {
    throw new Error.Params("参数user有误，请检查后重试");
  }

  const provinceData = JSON.parse(
    JSON.stringify(await areaModel.findByPk(deliver.province))
  );

  if (provinceData === null) {
    throw new Error.Params("参数province有误，请检查后重试");
  }

  if (deliver.city) {
    const cityData = JSON.parse(
      JSON.stringify(await areaModel.findByPk(deliver.city))
    );

    if (cityData === null) {
      throw new Error.Params("参数city有误，请检查后重试");
    }
  }

  if (deliver.area) {
    const areaData = JSON.parse(
      JSON.stringify(await areaModel.findByPk(deliver.area))
    );

    if (areaData === null) {
      throw new Error.Params("参数area有误，请检查后重试");
    }
  }

  if (isType(deliver.default) !== "boolean") {
    throw new Error.Params("default属性有误，请检查后重试");
  }

  try {
    if (deliver.default) {
      await deliverModel.update(
        {
          default: false,
        },
        {
          where: {
            user: deliver.user,
          },
        }
      );
    }

    const resp = (await createDeliver(deliver)) as unknown as Deliver;

    const province = JSON.parse(
      JSON.stringify(await area.findByPk(resp.province))
    ) as Area;

    const city = JSON.parse(
      JSON.stringify(await area.findByPk(resp.city))
    ) as Area;

    const uesrArea = JSON.parse(
      JSON.stringify(await area.findByPk(resp.area))
    ) as Area;

    resp.province = {
      id: province.id,
      name: province.area_name,
    } as any;

    resp.city = {
      id: city.id,
      name: city.area_name,
    } as any;

    resp.area = {
      id: uesrArea && uesrArea.id,
      name: uesrArea && uesrArea.area_name,
    } as any;

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function deliverUpdate(id: string, deliver: Deliver) {
  if (
    !deliver.user ||
    !deliver.province ||
    !deliver.detail ||
    deliver.default === undefined ||
    !deliver.name ||
    !deliver.phone
  ) {
    throw new Error.Params();
  }

  const user = JSON.parse(JSON.stringify(await findOneUserById(deliver.user)));

  if (user === null) {
    throw new Error.Params("参数user有误，请检查后重试");
  }

  const provinceData = JSON.parse(
    JSON.stringify(await areaModel.findByPk(deliver.province))
  );

  if (provinceData === null) {
    throw new Error.Params("参数province有误，请检查后重试");
  }

  if (deliver.city) {
    const cityData = JSON.parse(
      JSON.stringify(await areaModel.findByPk(deliver.city))
    );

    if (cityData === null) {
      throw new Error.Params("参数city有误，请检查后重试");
    }
  }

  if (deliver.area) {
    const areaData = JSON.parse(
      JSON.stringify(await areaModel.findByPk(deliver.area))
    );

    if (areaData === null) {
      throw new Error.Params("参数area有误，请检查后重试");
    }
  }

  if (isType(deliver.default) !== "boolean") {
    throw new Error.Params("default属性有误，请检查后重试");
  }

  try {
    if (deliver.default) {
      await deliverModel.update(
        {
          default: false,
        },
        {
          where: {
            user: deliver.user,
          },
        }
      );
    }

    await updateDeliver(id, deliver);

    return await fetchDeliver(deliver.user);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function deliverDelete(id: string) {
  const deliver = JSON.parse(JSON.stringify(await deliverModel.findByPk(id)));

  if (deliver === null) {
    throw new Error.Params("id参数有误，请检查后重试");
  }

  try {
    return await deleteDeliver(id);
  } catch {
    throw new Error.UnkownError();
  }
}
