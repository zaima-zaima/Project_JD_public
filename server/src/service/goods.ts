import {
  deleteGoods,
  fetchGoodsByKeyWord,
  findGoodsSoldCount,
  findGoodsSoldFrequentCount,
  getGoods,
  getGoodsById,
  getGoodsByRandom,
  goodsCreator,
  updateGoods,
} from "../mysql/api/goods";
import { Goods } from "../types/Goods";
import admin from "../mysql/model/admin";
import userModel from "../mysql/model/user";
import { ResponseWithCount } from "../types/Response";
import goodsModel from "../mysql/model/goods";
import { randomNumberGenerator } from "../utils/random";
import Error from "../utils/Error";
import isType from "../utils/isType";

export async function createGoods(goods: Goods) {
  if (
    !goods.name ||
    !goods.price ||
    !goods.store ||
    goods.deliver === undefined ||
    goods.back7day === undefined ||
    goods.baitiaoPay === undefined ||
    !goods.brand ||
    !goods.no ||
    !goods.weight ||
    !goods.ingradient ||
    !goods.approperate ||
    !goods.region ||
    !goods.specification ||
    goods.tags === undefined ||
    goods.keywords === undefined
  ) {
    throw new Error.Params();
  }

  if (String(Number(goods.price)) === "NaN") {
    throw new Error.Params();
  }

  if (String(Number(goods.store)) === "NaN") {
    throw new Error.Params();
  }

  if (String(Number(goods.weight)) === "NaN") {
    throw new Error.Params();
  }

  const noReg = /^(\w)\w+$/;

  if (!noReg.test(goods.no)) {
    throw new Error.Params();
  }

  if (isType(goods.deliver) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.baitiaoPay) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.back7day) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.tags) !== "array") {
    throw new Error.Params();
  }

  try {
    goods.serviceSupport = JSON.stringify(goods.serviceSupport);
    goods.tags = JSON.stringify(goods.tags);
    goods.keywords = JSON.stringify(goods.keywords);
    goods.thumbs = JSON.stringify(goods.thumbs);
    goods.desc = JSON.stringify(goods.desc);
    return await goodsCreator(goods);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchGoodsByRandom(length: number) {
  if (!length) {
    throw new Error.Params();
  }

  try {
    const count = await goodsModel.count();
    let end = count - length;

    if (end < 0) {
      return await getGoods(1, length);
    }

    const random = randomNumberGenerator(0, end);

    return await getGoodsByRandom(random, length);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchAllGoods(page: number, limit: number) {
  if (!page || !limit || !Number(page) || !Number(limit)) {
    throw new Error.Params();
  }

  try {
    let resp = (await getGoods(
      page,
      limit
    )) as unknown as ResponseWithCount<Goods>;
    resp = JSON.parse(JSON.stringify(resp));
    for (let i = 0; i < resp.rows.length; i++) {
      const userid = resp.rows[i].owner;
      const user = (await admin.findByPk(userid)) as any;
      if (user) {
        resp.rows[i].publisher = {
          username: user.username,
          role: "admin",
        };
      } else {
        const userInfo = (await userModel.findByPk(userid)) as any;
        resp.rows[i].publisher = {
          username: userInfo.username,
          role: "user",
        };
      }
    }

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchGoodsById(id: string) {
  if (!id) {
    throw new Error.Params();
  }

  try {
    const resp = await getGoodsById(id);

    await goodsModel.increment("views", {
      where: {
        id,
      },
    });

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function goodsUpdate(id: string, goods: Goods) {
  if (
    !id ||
    !goods.name ||
    !goods.price ||
    !goods.store ||
    goods.deliver === undefined ||
    goods.back7day === undefined ||
    goods.baitiaoPay === undefined ||
    !goods.brand ||
    !goods.no ||
    !goods.weight ||
    !goods.ingradient ||
    !goods.approperate ||
    !goods.region ||
    !goods.specification ||
    goods.tags === undefined ||
    goods.keywords === undefined
  ) {
    throw new Error.Params();
  }

  if (String(Number(goods.price)) === "NaN") {
    throw new Error.Params();
  }

  if (String(Number(goods.store)) === "NaN") {
    throw new Error.Params();
  }

  if (String(Number(goods.weight)) === "NaN") {
    throw new Error.Params();
  }

  const noReg = /\w+/;

  if (!noReg.test(goods.no)) {
    throw new Error.Params();
  }

  if (isType(goods.deliver) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.baitiaoPay) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.back7day) !== "boolean") {
    throw new Error.Params();
  }

  if (isType(goods.tags) !== "array") {
    throw new Error.Params();
  }

  const goodsTar = JSON.parse(JSON.stringify(await fetchGoodsById(id)));

  if (goodsTar === null) {
    throw new Error.Params("id参数错误，请检查后重试");
  }

  try {
    goods.serviceSupport = JSON.stringify(goods.serviceSupport);
    goods.tags = JSON.stringify(goods.tags);
    goods.keywords = JSON.stringify(goods.keywords);
    goods.thumbs = JSON.stringify(goods.thumbs);
    goods.desc = JSON.stringify(goods.desc);
    return await updateGoods(id, goods);
  } catch {
    throw new Error.Params();
  }
}

export async function searchGoods(
  keywords: string,
  page: number,
  limit: number
) {
  if (!keywords || !page || !limit) {
    throw new Error.Params();
  }

  try {
    return await fetchGoodsByKeyWord(keywords, page, limit);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function removeGoods(id: string) {
  const test = JSON.parse(JSON.stringify(goodsModel.findByPk(id)));

  if (!test) {
    throw new Error.Params("商品不存在！请检查id参数后重试");
  }

  try {
    return await deleteGoods(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchGoodsSoldFrequentCount(limit: number) {
  try {
    return await findGoodsSoldFrequentCount(limit);
  } catch (err) {
    console.log(err);

    throw new Error.UnkownError();
  }
}

export async function fetchGoodsSoldCount(limit: number) {
  try {
    return await findGoodsSoldCount(limit);
  } catch {
    throw new Error.UnkownError();
  }
}
