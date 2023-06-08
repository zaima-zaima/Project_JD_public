import {
  deleteOrder,
  findAllOrder,
  findAllOrderByUser,
  findOrderById,
  findOrderCountByUser,
  orderCreator,
  orderUpdator,
} from "../mysql/api/order";
import { Order, OrderStatus } from "../types/order";

import model from "../mysql/model/goods";
import { Goods } from "../types/Goods";
import { ResponseWithCount } from "../types/Response";
import { findDeliverById } from "../mysql/api/deliver";
import deliverModal from "../mysql/model/deliver";
import { Deliver } from "../types/Deliver";
import areaModal from "../mysql/model/area";
import userModel from "../mysql/model/user";
import { parser } from "../utils/parser";
import { User } from "../types/User";
import Error from "../utils/Error";
import { log } from "console";
import { goodsUpdate } from "./goods";
import { updateGoods } from "../mysql/api/goods";
import goodsModel from "../mysql/model/goods";

export async function fetchAllOrder(page: number, limit: number) {
  if (!page || !limit || !Number(page) || !Number(limit)) {
    throw new Error.Params();
  }

  try {
    const resp = JSON.parse(
      JSON.stringify(await findAllOrder(page, limit))
    ) as unknown as ResponseWithCount<Order>;

    for (let i = 0; i < resp.rows.length; i++) {
      resp.rows[i].u = parser(
        await userModel.findByPk(resp.rows[i].user)
      ) as User;

      ///////

      resp.rows[i].goods = JSON.parse(
        JSON.stringify(await model.findByPk(resp.rows[i].goodsId))
      ) as unknown as Goods;
      //////

      const deliver = JSON.parse(
        JSON.stringify(
          await findDeliverById(
            resp.rows[i].deliverAddress as unknown as string
          )
        )
      ) as unknown as Deliver;

      if (deliver === null) {
        continue;
      }

      const deliverInfo = JSON.parse(
        JSON.stringify(
          await deliverModal.findOne({
            where: {
              province: deliver.province,
              city: deliver.city,
              area: deliver.area,
            },
          })
        )
      ) as any;

      const province = JSON.parse(
        JSON.stringify(await areaModal.findByPk(deliverInfo.province))
      ) as any;

      const city = JSON.parse(
        JSON.stringify(await areaModal.findByPk(deliverInfo.city))
      ) as any;

      const area = JSON.parse(
        JSON.stringify(await areaModal.findByPk(deliverInfo.area))
      ) as any;

      resp.rows[i].deliverAddress = {} as any;

      resp.rows[i].deliverAddress.province = province.area_name;

      resp.rows[i].deliverAddress.city = city.area_name;
      if (area) {
        resp.rows[i].deliverAddress.area = area.area_name;
      }

      resp.rows[i].deliverAddress.detail = deliverInfo.detail;
    }

    return resp;
  } catch (err) {
    console.log(err);
    throw new Error.UnkownError();
  }
}

export async function fetchAllOrderByUser(
  user: string,
  page: number,
  limit: number,
  filter: any
) {
  if (!page || !limit || !Number(page) || !Number(limit) || !user) {
    throw new Error.Params();
  }

  try {
    const resp = (await findAllOrderByUser(
      user,
      page,
      limit,
      filter
    )) as unknown as ResponseWithCount<Order>;

    let parse: any;

    parse = JSON.parse(JSON.stringify(resp.rows));
    for (let i = 0; i < resp.rows.length; i++) {
      parse[i].goods = await model.findByPk(parse[i].goodsId);
    }

    resp.rows = parse;

    // console.log(JSON.parse(JSON.stringify(resp)));

    return resp;
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchOrderById(id: string) {
  if (!id) {
    throw new Error.Params("参数oid有误，检查后请重试");
  }

  try {
    const resp = JSON.parse(
      JSON.stringify(await findOrderById(id))
    ) as unknown as Order;

    resp.goods = (await model.findByPk(resp.goodsId)) as unknown as Goods;

    const deliver = (await findDeliverById(
      resp.deliverAddress as unknown as string
    )) as unknown as Deliver;

    const deliverInfo = JSON.parse(
      JSON.stringify(
        await deliverModal.findOne({
          where: {
            province: deliver.province,
            city: deliver.city,
            area: deliver.area,
          },
        })
      )
    ) as any;

    const province = JSON.parse(
      JSON.stringify(await areaModal.findByPk(deliverInfo.province))
    ) as any;

    const city = JSON.parse(
      JSON.stringify(await areaModal.findByPk(deliverInfo.city))
    ) as any;

    const area = JSON.parse(
      JSON.stringify(await areaModal.findByPk(deliverInfo.area))
    ) as any;

    resp.deliverAddress = {} as any;

    resp.deliverAddress.province = province.area_name;
    resp.deliverAddress.city = city.area_name;
    if (area) {
      resp.deliverAddress.area = area.area_name;
    }

    resp.deliverAddress.detail = deliverInfo.detail;

    return resp;
  } catch (err) {
    console.log(err);

    throw new Error.UnkownError();
  }
}

export async function orderSetup(data: Order) {
  if (
    !data.user ||
    !data.deliverName ||
    !data.deliverPhone ||
    !data.deliverAddress ||
    !data.payment ||
    !data.orderList ||
    data.status
  ) {
    throw new Error.Params();
  }

  try {
    for (let i = 0; i < data.orderList.length; i++) {
      let goods = {
        ...data,
      } as any;

      delete goods.orderList;
      goods.goodsId = data.orderList[i].id;
      goods.count = data.orderList[i].cartCount;
      const order = JSON.parse(JSON.stringify(await orderCreator(goods)));
      data.orderList[i].order = order.id;
    }

    // const resp = JSON.parse(JSON.stringify(await orderCreator(data)));

    // const orderList = resp.orderList;
    for (let i = 0; i < data.orderList.length; i++) {
      const goods = JSON.parse(
        JSON.stringify(await model.findByPk(data.orderList[i].id))
      ) as Goods;

      await updateGoods(
        data.orderList[i].id as string,
        { sold: +goods.sold + data.orderList[i].cartCount } as Goods
      );

      await updateGoods(
        data.orderList[i].id as string,
        { store: String(+goods.store - data.orderList[i].cartCount) } as Goods
      );
    }
    return data;
  } catch (err) {
    throw new Error.UnkownError();
  }
}

export async function updateOrder(id: string, data: Order) {
  if (!data.status || !id) {
    throw new Error.Params();
  }

  const order = JSON.parse(JSON.stringify(await findOrderById(id))) as Order;

  if (!order) {
    throw new Error.Params("该订单不存在");
  }

  if (
    data.status === "cancel" &&
    (order.status === OrderStatus.done ||
      order.status === OrderStatus.complated)
  ) {
    throw new Error.Forbiden("该订单不支持此操作");
  }

  try {
    const newOrder = await orderUpdator(id, data);

    const user = JSON.parse(
      JSON.stringify(await userModel.findByPk(order.user))
    ) as User;

    if (
      data.status === "cancel" &&
      order.payment === "baitiao" &&
      (order.status === OrderStatus.paid ||
        order.status === OrderStatus.deliver)
    ) {
      // 当用户取消订单时

      const g = JSON.parse(
        JSON.stringify(
          await goodsModel.findByPk(order.goodsId as unknown as string)
        )
      ) as Goods;

      // 更新用户的白条额度

      await userModel.update(
        {
          baitiao:
            +g.price * (order as any).count + (user.baitiao ? user.baitiao : 0),
        },
        {
          where: {
            id: order.user,
          },
        }
      );

      // 更新商品的库存

      await goodsModel.update(
        {
          store: g.store + (order as any).count,
          sold: g.sold - (order as any).count,
        },
        {
          where: {
            id: order.goodsId,
          },
        }
      );
    } else if (data.status === "cancel") {
      // 更新商品的库存

      const g = JSON.parse(
        JSON.stringify(
          await goodsModel.findByPk(order.goodsId as unknown as string)
        )
      ) as Goods;

      await goodsModel.update(
        {
          store: g.store + (order as any).count,
          sold: g.sold - (order as any).count,
        },
        {
          where: {
            id: order.goodsId,
          },
        }
      );
    }

    const newUser = JSON.parse(
      JSON.stringify(await userModel.findByPk(order.user))
    ) as User;

    return { newOrder, newUser };
  } catch (err) {
    console.log(err);

    throw new Error.UnkownError();
  }
}

export async function removeOrder(id: string) {
  if (!id) {
    throw new Error.Params();
  }

  try {
    return await deleteOrder(id);
  } catch {
    throw new Error.UnkownError();
  }
}

export async function fetchOrderCountByUser(limit: number) {
  try {
    return await findOrderCountByUser(limit);
  } catch {
    throw new Error.UnkownError();
  }
}
