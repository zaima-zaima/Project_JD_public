import { Op } from "sequelize";
import { Goods } from "../../types/Goods";
import model from "../model/goods";
import sequelize from "../connect";
import unique from "../../utils/unique";

export async function goodsCreator(data: Goods) {
  try {
    return await model.create({
      ...data,
    });
  } catch (e) {
    return {
      code: 403,
      msg: e,
    };
  }
}

export async function getGoods(page: number, limit: number) {
  return await model.findAndCountAll({
    order: [["createdAt", "DESC"]],
    offset: (page - 1) * limit,
    limit: limit,
  });
}

export async function getGoodsById(id: string) {
  return await model.findByPk(id);
}

export async function updateGoods(id: string, form: Goods) {
  return await model.update(
    {
      ...form,
    },
    {
      where: {
        id,
      },
    }
  );
}

export async function getGoodsByRandom(offset: number, limit: number) {
  return await model.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
}

export async function fetchGoodsByKeyWord(
  keyword: string,
  page: number,
  limit: number
) {
  return await model.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    offset: (page - 1) * limit,
    limit,
  });
}

export async function deleteGoods(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}

export async function findGoodsSoldFrequentCount(limit: number) {
  limit = limit || 10;

  const data = await sequelize.query(
    `select goodsId, count(goodsId) as count from \`order\` group by goodsId order by count(goodsId) desc limit ${limit};`
  );

  return await execution(data, "count", "goodsId");
}

async function execution(data: any, signal: string, uniqueSignal: string) {
  let conbine = [] as any[];

  for (let i = 0; i < data.length; i++) {
    conbine = [...conbine, ...(data[i] as any)];
  }

  conbine = unique(conbine, uniqueSignal);

  let resp = [] as any[];

  for (let i = 0; i < conbine.length; i++) {
    const goods = JSON.parse(
      JSON.stringify(await model.findByPk(conbine[i][uniqueSignal]))
    ) as Goods;

    if (goods) {
      let configure = { name: goods.name } as any;

      configure[signal] = conbine[i][signal];

      resp.push(configure);
    }
  }
  return resp;
}

export async function findGoodsSoldCount(limit: number) {
  limit = limit || 10;

  const data = await sequelize.query(
    `select id,sold from \`goods\` order by \`sold\` desc limit 10;`
  );

  return await execution(data, "sold", "id");
}
