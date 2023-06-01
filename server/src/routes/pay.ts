import Express from "express";
import { findOneUserById } from "../mysql/api/user";
import model from "../mysql/model/order";
import { fetchOrderById } from "../service/order";
import { Order, OrderStatus, Payment } from "../types/order";
import { User } from "../types/User";
import Error from "../utils/Error";
import { randomNumberGenerator } from "../utils/random";
import formatResponse from "../utils/response";
import userModel from "../mysql/model/user";
import { generator } from "../utils/token";
import { findOrderById } from "../mysql/api/order";
import { fetchGoodsById } from "../service/goods";
import { Goods } from "../types/Goods";
import { log } from "console";

const router = Express();

router.post("/", async (req, res, next) => {
  if (!req.body.oid || !req.body.paymentMethod) {
    res.send(formatResponse(400, "参数错误", null));
    return;
  }

  try {
    if (req.body.paymentMethod === "online") {
      setTimeout(async () => {
        if (Math.random() > 0.5) {
          const resp = await model.update(
            {
              status: OrderStatus.paid,
            },
            {
              where: {
                id: req.body.oid,
              },
            }
          );

          if (resp) {
            res.send(formatResponse(0, "支付成功", true));
            return;
          } else {
            res.send(formatResponse(0, "支付失败", false));
            return;
          }
        } else {
          res.send(formatResponse(0, "支付失败", false));
          return;
        }
      }, randomNumberGenerator(1500, 3000));
      // 在线支付
    } else if (req.body.paymentMethod === "baitiao") {
      // 白条支付

      const user = JSON.parse(
        JSON.stringify(await findOneUserById(req.body.user))
      ) as unknown as User;
      if (user.baitiao === null) {
        throw new Error.Forbiden("你尚未开通白条服务，请开通此服务后再次尝试");
      }
      const order = JSON.parse(
        JSON.stringify(await findOrderById(req.body.oid))
      ) as Order;

      const goods = JSON.parse(
        JSON.stringify(await fetchGoodsById(order.goodsId))
      ) as Goods;

      if (user.baitiao < +goods.price) {
        throw new Error.Forbiden("你当前的额度无法支付该订单");
      }

      setTimeout(async () => {
        const resp = await model.update(
          {
            status: OrderStatus.paid,
            payment: Payment.baitiao,
          },
          {
            where: {
              id: req.body.oid,
            },
          }
        );

        if (resp) {
          await userModel.update(
            { baitiao: (user.baitiao as any) - Number(goods.price) },
            {
              where: {
                id: req.body.user,
              },
            }
          );

          const authData = generator(
            {
              username: user.username,
              id: user.id,
              role: user.role,
              phone: user.phone,
              credit: user.credit,
              baitiao: (user.baitiao as any) - Number(goods.price),
              avatar: user.avatar,
              sym: "github",
            } as any,
            7
          );

          res.setHeader("authorization", "Bearer " + authData.token);

          res.send(formatResponse(0, "支付成功", true));
          return;
        } else {
          res.send(formatResponse(0, "支付失败", false));
          return;
        }
      }, randomNumberGenerator(1500, 3000));
    } else {
      res.send(formatResponse(400, "参数错误", null));
      return;
    }
  } catch (err) {
    console.log(err);

    res.send(formatResponse(500, "查询错误", err));
    return;
  }
});

router.post("/group", async (req, res, next) => {
  if (!req.body.order) {
    res.send(formatResponse(400, "参数错误", null));
    return;
  }

  try {
    if (req.body.order.payment === "online") {
      setTimeout(async () => {
        if (Math.random() > 0.5) {
          const list = (req.body.order as Order).orderList;
          let boolean = true;

          for (let i = 0; i < list.length; i++) {
            const resp = JSON.parse(
              JSON.stringify(
                await model.update(
                  {
                    status: OrderStatus.paid,
                  },
                  {
                    where: {
                      id: list[i].order,
                    },
                  }
                )
              )
            );

            if (!resp[0]) {
              boolean = false;
            }
          }

          if (boolean) {
            res.send(formatResponse(0, "支付成功", true));
            return;
          } else {
            res.send(formatResponse(0, "支付失败", false));
            return;
          }
        } else {
          res.send(formatResponse(0, "支付失败", false));
          return;
        }
      }, randomNumberGenerator(1500, 3000));
      // 在线支付
    } else if (req.body.order.payment === "baitiao") {
      // 白条支付

      const user = JSON.parse(
        JSON.stringify(await findOneUserById(req.body.order.user))
      ) as unknown as User;

      if (user.baitiao === null) {
        throw new Error.Forbiden("你尚未开通白条服务，请开通此服务后再次尝试");
      }

      const total = (req.body.order as Order).orderList.reduce(
        (initial, nextValue) => initial + +nextValue.price,
        0
      );

      if (user.baitiao < total) {
        throw new Error.Forbiden("你当前的额度无法支付该订单");
      }

      setTimeout(async () => {
        const list = (req.body.order as Order).orderList;
        let boolean = true;

        for (let i = 0; i < list.length; i++) {
          const resp = JSON.parse(
            JSON.stringify(
              await model.update(
                {
                  status: OrderStatus.paid,
                },
                {
                  where: {
                    id: list[i].order,
                  },
                }
              )
            )
          );

          if (!resp[0]) {
            boolean = false;
          }
        }

        if (boolean) {
          await userModel.update(
            { baitiao: (user.baitiao as any) - total },
            {
              where: {
                id: req.body.order.user,
              },
            }
          );

          const authData = generator(
            {
              username: user.username,
              id: user.id,
              role: user.role,
              phone: user.phone,
              credit: user.credit,
              baitiao: (user.baitiao as any) - total,
              avatar: user.avatar,
              sym: "github",
            } as any,
            7
          );

          res.setHeader("authorization", "Bearer " + authData.token);
          res.send(formatResponse(0, "支付成功", true));
          return;
        } else {
          res.send(formatResponse(0, "支付失败", false));
          return;
        }
      }, randomNumberGenerator(1500, 3000));
    } else {
      res.send(formatResponse(400, "参数错误", null));
      return;
    }
  } catch (err) {
    console.log(err);

    res.send(formatResponse(500, "查询错误", err));
    return;
  }
});

export default router;
