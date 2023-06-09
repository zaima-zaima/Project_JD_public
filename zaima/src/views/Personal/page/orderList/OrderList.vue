<template>
  <div class="order-list-container">
    <div class="title">我的订单</div>
    <div class="orderList-body">
      <div class="header">
        <div class="category-bar">
          <div
            class="all category-item pointer hover-base"
            :class="{ active: route.query.status === 'all' }"
            @click="fetchCateOrder('all')"
          >
            <span>全部订单</span>
          </div>
          <div
            class="unpay category-item pointer hover-base"
            :class="{ active: route.query.status === 'pending' }"
            @click="fetchCateOrder('pending')"
          >
            <span>待付款</span>
          </div>
          <div
            class="paid category-item pointer hover-base"
            :class="{ active: route.query.status === 'paid' }"
            @click="fetchCateOrder('paid')"
          >
            <span>待发货</span>
          </div>
          <div
            class="deliver category-item pointer hover-base"
            :class="{ active: route.query.status === 'deliver' }"
            @click="fetchCateOrder('deliver')"
          >
            <span>待收货</span>
          </div>
          <div
            class="done category-item pointer hover-base"
            :class="{ active: route.query.status === 'done' }"
            @click="fetchCateOrder('done')"
          >
            <span>待评价</span>
          </div>
        </div>
        <div class="my-actions">
          <span>|</span>
          <span class="hover-base pointer">我的常购商品</span>
          <span>|</span>
          <span class="hover-base pointer">商品回收站</span>
          <span>|</span>
        </div>
        <div class="search-box">
          <input type="text" />
          <div class="search-button pointer">
            <Icon :type="StyleType.search" :size="18" />
          </div>
        </div>
      </div>
      <Loading :size="100" v-show="state.loading" />
      <Table
        v-if="state.list.length !== 0 && !state.loading"
        :list="state.list"
        @pay-status="changePayStatus"
        @change-deliver-status="changeDeliverStatus"
        @submit-comment="submitComment"
      />
      <Empty
        v-if="state.list.length === 0 && !state.loading"
        text="没有该类型的订单"
        :size="60"
      />
      <Pager
        :total="state.total"
        :limit="+(route.query.limit as string) || 10"
        :page="+(route.query.page as string) || 1"
        @change="changePage"
        v-if="state.list.length !== 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { commentCreator } from "../../../../api/comment";
import { getOrderByUser, updateOrder } from "../../../../api/order";
import Empty from "../../../../components/Empty.vue";
import Icon from "../../../../components/Icon.vue";
import { Comment } from "../../../../types/comment";
import { StyleType } from "../../../../types/enum";
import { Order, OrderStatus } from "../../../../types/order";
import { ResponseWithCount } from "../../../../types/response";
import Pager from "../../../../components/Pager/index.vue";

import Table from "./components/Table.vue";
import Loading from "../../../../components/Loading.vue";

const state = reactive({
  list: [] as Order[],
  total: 0,
  cur: 0,
  all: [] as Order[],
  loading: false,
});

const store = useStore();
const router = useRouter();
const route = useRoute();

watchEffect(async () => {
  if (store.state.user) {
    state.loading = true;
    const resp = (await getOrderByUser(
      store.state.user.id,
      +(route.query.page as string) || 1,
      +(route.query.limit as string) || 10,
      {
        status: route.query.status === "all" ? undefined : route.query.status,
      }
    )) as unknown as ResponseWithCount<Order>;
    state.list = resp.rows;
    state.total = resp.count;
    state.all = state.list;
    state.loading = false;
  }
});

function changePayStatus(status: boolean, oid: string) {
  state.list = state.list.map((item) => {
    if (item.id === oid) {
      item.status = status ? OrderStatus.paid : OrderStatus.pending;
    }
    return item;
  });
}

async function fetchCateOrder(status: string) {
  router.push({
    query: {
      ...route.query,
      page: 1,
      status,
    },
  });
}

async function changeDeliverStatus(
  oid: string,
  status: string,
  callback: Function
) {
  await updateOrder(oid, { status } as any);
  callback();
  state.list = state.list.map((item) => {
    if (item.id === oid) {
      item.status = status as any;
    }
    return item;
  });
}

async function submitComment(
  comment: Comment,
  callback: Function,
  before: Function,
  after: Function
) {
  comment.uid = store.state.user.id;
  before();
  const resp = await commentCreator(comment);
  after();
  state.list = state.list.map((item) => {
    if (comment.oid === item.id) {
      item.status = OrderStatus.complated;
    }
    return item;
  });
  callback();
}

function changePage(page: number) {
  router.push({
    query: {
      ...route.query,
      page,
    },
  });
}
</script>

<style scoped lang="less">
.order-list-container {
  width: 100%;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .orderList-body {
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    .header {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      .category-bar {
        display: flex;
        width: 50%;
        justify-content: space-around;
        .category-item {
          position: relative;
          left: 0;
          top: 0;
          span {
            color: inherit;
          }
          &.active {
            color: @baseColor;
            font-weight: bold;
            &::after {
              content: "";
              display: block;
              width: 100%;
              height: 4px;
              background: @baseColor;
            }
          }
          .badge {
            box-sizing: border-box;
            padding: 0px 5px;
            font-size: 10px;
            color: #fff;
            position: absolute;
            border-radius: 50%;
            top: -10px;
            left: 40px;
            background-color: @baseColor;
          }
        }
      }
      .my-actions {
        width: 400px;
        box-sizing: border-box;
        padding: 0px 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 12px;
        span:nth-of-type(2) {
          font-weight: bold;
          color: #000;
        }
      }
      .search-box {
        width: 400px;
        display: flex;
        align-items: center;
        input {
          width: 200px;
          height: 25px;
          box-sizing: border-box;
          padding-left: 5px;
          outline: none;
        }
        .search-button {
          width: 50px;
          height: 25px;
          background-color: @baseColor;
          color: #fff;
          text-align: center;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
