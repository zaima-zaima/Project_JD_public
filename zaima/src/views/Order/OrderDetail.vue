<template>
  <div class="order-detail-container" v-if="state.order">
    <div class="order-detail-content" v-if="state.order.id">
      <div class="order-main-pannel">
        <div class="order-status-container">
          <div class="order-no">订单号: {{ state.order.id }}</div>
          <div
            class="order-status"
            :style="{
              color: state.order.status === OrderStatus.cancel ? '#ccc' : '',
            }"
          >
            {{
              state.order.status === OrderStatus.pending
                ? "未付款"
                : state.order.status === OrderStatus.paid
                ? "等待发货"
                : state.order.status === OrderStatus.deliver
                ? "运输中"
                : state.order.status === OrderStatus.cancel
                ? "已取消"
                : "已完成"
            }}
          </div>
          <div class="footer"></div>
        </div>
        <div
          class="order-process"
          v-if="state.order.status !== OrderStatus.cancel"
        >
          <div class="order-inner">
            <Prograss :steps="state.steps" :current="state.current" />
          </div>
        </div>
      </div>
      <GoodsInfo :data="state.order" />
      <DeliverInfo :data="state.order" />
    </div>
    <div class="loading" v-else>
      <Loading :size="200" text="加载中" />
    </div>
  </div>
  <div class="order-not-found center" v-else>
    <Icon :type="StyleType.cartEmpty" :size="100"></Icon>
    <span>😭该订单不存在</span>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOrderById } from "../../api/order";
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
import { Order, OrderStatus } from "../../types/order";
import Prograss from "../../components/Prograss/index.vue";
import DeliverInfo from "./pages/DeliverInfo.vue";
import GoodsInfo from "./pages/GoodsInfo.vue";
import Loading from "../../components/Loading.vue";

const router = useRouter();
const route = useRoute();
const state = reactive({
  order: {} as any,
  steps: ["提交订单", "付款成功", "商家发货", "商品签收"],
  current: 1,
});

watchEffect(async () => {
  state.order = (await getOrderById(
    route.query.oid as string
  )) as unknown as Order;

  if (state.order.code && state.order.code !== 0 && state.order.msg) {
    state.order = null;
  }

  if (state.order.status === OrderStatus.pending) {
    state.current = 1;
  } else if (state.order.status === OrderStatus.paid) {
    state.current = 2;
  } else if (state.order.status === OrderStatus.deliver) {
    state.current = 3;
  } else if (state.order.status === OrderStatus.done) {
    state.current = 4;
  } else {
    state.current = 5;
  }
});
</script>

<style scoped lang="less">
.order-not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  span {
    font-size: inherit;
  }
}
.order-detail-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .loading {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .order-detail-content {
    width: 100%;
    box-sizing: border-box;
    .order-main-pannel {
      width: 100%;
      height: 260px;
      box-sizing: 10px;
      background-color: #fff;
      display: flex;
      box-sizing: border-box;
      border-top: 5px solid rgb(64, 212, 64);
      .order-status-container {
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        justify-content: space-around;
        // background-color: red;
        .order-status {
          margin-top: 20px;
          font-size: 30px;
          color: rgb(32, 183, 27);
        }
        .footer {
          width: 100%;
          display: flex;
          justify-content: space-around;
          box-sizing: border-box;
          padding: 0px 10px;
          span {
            color: inherit;
          }
        }
      }
      .order-process {
        flex: 1;
        height: 100%;
        // background-color: green;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0px 30px;
        .order-inner {
          width: 100%;
        }
      }
    }
  }
}
</style>
