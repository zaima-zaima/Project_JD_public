<template>
  <div class="overview-container">
    <div class="person-pannel">
      <PersonPannel />
    </div>
    <div class="over-view-attach">
      <div class="left">
        <div class="my-order">
          <div class="title">我的订单</div>
          <div class="content">
            <div class="status">
              <div class="item pending" @click="goOrderList('pending')">
                <div class="img"></div>
                <div class="title">待付款</div>
              </div>
              <div class="item deliver" @click="goOrderList('deliver')">
                <div class="img"></div>
                <div class="title">待收货</div>
              </div>
              <div class="item comment" @click="goOrderList('done')">
                <div class="img"></div>
                <div class="title">待评价</div>
              </div>
              <div class="item return">
                <div class="img"></div>
                <div class="title">退换/售后</div>
              </div>
              <div class="item all" @click="goOrderList('all')">
                <div class="img"></div>
                <div class="title">全部订单</div>
              </div>
            </div>
            <div class="goods">
              <div class="orderList" v-if="state.orderList.length !== 0">
                <div class="order-item" v-for="item in state.orderList">
                  <div class="left">
                    <div class="thumb">
                      <img :src="item.goods.thumbs[0]" alt="" />
                    </div>
                    <div class="item-detail">
                      <div class="process">
                        {{
                          item.status === OrderStatus.pending
                            ? "买家未付款"
                            : item.status === OrderStatus.paid
                            ? "买家已付款，等待卖家发货"
                            : item.status === OrderStatus.deliver
                            ? "卖家已发货，等待收货"
                            : item.status === OrderStatus.cancel
                            ? "订单已取消"
                            : "订单已完成"
                        }}
                      </div>
                      <div class="detail">
                        <span class="deliver">{{
                          item.status === OrderStatus.pending
                            ? "未分配"
                            : "快速邮递"
                        }}</span>
                        ｜
                        <span class="updateTime">
                          {{ formatDate(item.updatedAt, false, "-", true) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <span
                      class="pointer hover-base"
                      @click="goOrderDetail(item)"
                      >查看详情</span
                    >
                  </div>
                </div>
              </div>
              <div class="empty" v-else>
                <div class="icon">
                  <Icon :type="StyleType.cartEmpty" :size="50" />
                </div>
                <div class="tip">
                  您买的东西太少了，这里都空空的，快去挑选合适的商品吧！
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="my-flowing">
          <MyFlowing />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Carousel from "../../../../components/Carousel/Carousel.vue";
import Icon from "../../../../components/Icon.vue";
import { StyleType } from "../../../../types/enum";
import PersonPannel from "./components/PersonPannel.vue";
import MyFlowing from "./components/MyFlowing.vue";
import LifeService from "./components/LifeService.vue";
import { reactive, watchEffect } from "vue";
import { Order, OrderStatus } from "../../../../types/order";
import { getOrderByUser } from "../../../../api/order";
import { useStore } from "vuex";
import { ResponseWithCount } from "../../../../types/response";
import formatDate from "../../../../utils/formatDate";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const state = reactive({
  orderList: [] as Order[],
});

watchEffect(async () => {
  if (store.state.user) {
    const resp = (await getOrderByUser(
      store.state.user.id,
      1,
      2
    )) as unknown as ResponseWithCount<Order>;

    state.orderList = resp.rows;
  }
});

function goOrderList(status: string) {
  router.push({
    name: "OrderList",
    query: {
      status,
      page: 1,
      limit: 10,
    },
  });
}

function goOrderDetail(item: Order) {
  router.push({
    name: "OrderDetail",
    query: {
      oid: item.id,
    },
  });
}
</script>

<style scoped lang="less">
.person-pannel {
  width: 100%;
  height: 240px;
  background: #fff;
}

.over-view-attach {
  display: flex;
  width: 100%;
  margin-top: 30px;

  > .left {
    flex: 1 1 auto;

    .my-order {
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;

      & > .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
      }

      .content {
        width: 100%;
        height: 320px;
        display: flex;
        flex-direction: column;

        .status {
          display: flex;
          width: 100%;
          height: 100px;
          justify-content: space-around;
          align-items: center;

          .item {
            width: 80px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;

            &.pending .img {
              background-image: url("/src/assets/myAccount.png");
              background-repeat: no-repeat;
              background-position: 0 -195px;
            }

            &.deliver .img {
              background-image: url("/src/assets/myAccount.png");
              background-repeat: no-repeat;
              background-position: -75px -195px;
            }

            &.comment .img {
              background-image: url("/src/assets/myAccount.png");
              background-repeat: no-repeat;
              background-position: -155px -195px;
            }

            &.return .img {
              background-image: url("/src/assets/myAccount.png");
              background-repeat: no-repeat;
              background-position: -235px -195px;
            }

            &.all .img {
              background-image: url("/src/assets/myAccount.png");
              background-repeat: no-repeat;
              background-position: -315px -195px;
            }

            &:hover {
              .img {
                background-position-y: -248px;
              }
            }

            .img {
              width: 50px;
              height: 50px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .goods {
          flex: 1 1 auto;
          width: 100%;

          .orderList {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            .order-item {
              width: 100%;
              height: 80px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              > .left {
                display: flex;
                align-items: center;
                .thumb {
                  width: 80px;
                  height: 60px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .item-detail {
                  margin-left: 15px;
                }
              }
            }
          }

          .empty {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .plus-ad {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
      background-color: #fdcf04;
      margin-top: 20px;
      background-image: url("/src/assets/x-01.png");
      background-repeat: no-repeat;
      box-sizing: border-box;
      padding: 5px;

      .title {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 15px;
        align-items: center;

        span {
          font-size: 20px;
          color: rgb(53, 7, 7);
          font-weight: bold;
        }

        .btn {
          padding: 10px;
          border-radius: 15px;
          background: rgb(61, 60, 60);
          color: @dgold;

          &:hover {
            background-color: #fff;
            color: rgb(61, 60, 60);
          }
        }
      }

      .plus-carouel {
        width: 100%;
        flex: 1 1 auto;
        background-color: #fff;
      }
    }
  }

  > .right {
    width: 260px;
    margin-left: 30px;

    .my-flowing {
      width: 100%;
      height: 200px;
      background-color: #fff;
    }

    .life-service {
      width: 100%;
      height: 260px;
      background-color: #fff;
      margin-top: 20px;
    }
  }
}
</style>
