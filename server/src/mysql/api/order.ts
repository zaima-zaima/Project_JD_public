import { Goods } from "../../types/Goods";
import { Order } from "../../types/order";
import unique from "../../utils/unique";
import sequelize from "../connect";
import model from "../model/order";
import userModal from "../model/user";

export async function findAllOrder(page: number, limit: number) {
  return await model.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    order: [["createdAt", "DESC"]],
  });
}

export async function findAllOrderByUser(
  user: string,
  page: number,
  limit: number,
  filter: any
) {
  return await model.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    where: {
      user,
      ...filter,
    },
    order: [["createdAt", "DESC"]],
  });
}

export async function findOrderById(id: string) {
  return await model.findByPk(id);
}

export async function orderCreator(orderList: Order) {
  return await model.create({
    ...orderList,
  });
}

export async function orderUpdator(id: string, data: Order) {
  await model.update(
    {
      ...data,
    },
    {
      where: {
        id,
      },
    }
  );

  return await model.findByPk(id);
}

export async function deleteOrder(id: string) {
  return await model.destroy({
    where: {
      id,
    },
  });
}

export async function findOrderCountByUser(limit: number) {
  limit = limit || 10;

  const data = await sequelize.query(
    `select distinct user as username,count(\`user\`) as \`count\` from \`order\` group by user order by count(\`user\`) desc limit ${limit};`
  );

  return await execution(data, "count", "username");
}

async function execution(data: any, signal: string, uniqueSignal: string) {
  let conbine = [] as any[];

  for (let i = 0; i < data.length; i++) {
    conbine = [...conbine, ...(data[i] as any)];
  }

  conbine = unique(conbine, uniqueSignal);

  let resp = [] as any[];

  console.log(conbine);

  for (let i = 0; i < conbine.length; i++) {
    const result = JSON.parse(
      JSON.stringify(await userModal.findByPk(conbine[i][uniqueSignal]))
    );

    if (result) {
      let configure = { name: result.username } as any;

      configure[signal] = conbine[i][signal];

      resp.push(configure);
    }
  }
  return resp;
}
