import { findDiscussion, insertDiscussion } from "../mysql/api/discussion";
import userModal from "../mysql/model/user";
import { Discussion } from "../types/Discussion";
import Error from "../utils/Error";
import { broadcastDiscussion } from "../websoket/socket";
import { fetchGoodsById } from "./goods";

export async function fetchDiscussion(limit: number, goods: string) {
  if (!limit || !goods) {
    throw new Error.Params();
  }

  const goodsTar = JSON.parse(JSON.stringify(await fetchGoodsById(goods)));

  if (goodsTar === null) {
    throw new Error.Forbiden("goods参数有误，请检查该参数后重试");
  }

  try {
    const resp = JSON.parse(
      JSON.stringify(await findDiscussion(limit, goods))
    ) as Discussion[];
    for (let i = 0; i < resp.length; i++) {
      const user = JSON.parse(
        JSON.stringify(await userModal.findByPk(resp[i].userid))
      );
      resp[i].user = user;
    }
    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function addDiscussion(data: Discussion) {
  if (!data.userid || !data.msg || !data.goodsid) {
    throw new Error.Params();
  }

  const user = JSON.parse(
    JSON.stringify(await userModal.findByPk(data.userid))
  );

  if (user === null) {
    throw new Error.Params("user参数有误，请检查后重试");
  }

  const goods = JSON.parse(JSON.stringify(await fetchGoodsById(data.goodsid)));

  if (goods === null) {
    throw new Error.Params("goodsid参数有误");
  }

  try {
    const resp = JSON.parse(
      JSON.stringify(await insertDiscussion(data))
    ) as Discussion;

    resp.user = JSON.parse(
      JSON.stringify(await userModal.findByPk(resp.userid))
    );

    broadcastDiscussion(resp);

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}
