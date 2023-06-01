<template>
  <div class="menu-container">
    <div class="item" v-for="item in menu">
      <div class="title">{{ item.title }}</div>
      <div class="menu-item" v-for="n in item.data" @click="goPage(n.target)">
        {{ n.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goPage(target: string) {
  if (target === "OrderList") {
    router.push({
      name: target,
      query: {
        status: "all",
        page: 1,
        limit: 10,
      },
    });
    return;
  }

  router.push({
    name: target,
  });
}

const menu = [
  {
    title: "订单中心",
    data: [
      { text: "我的订单", target: "OrderList" },
      { text: "评价晒单", target: "comment" },
    ],
  },
  {
    title: "我的钱包",
    data: [
      { text: "优惠券", target: "ticket" },
      { text: "京豆", target: "dou" },
      { text: "白条", target: "baitiao" },
      { text: "红包", target: "hongbao" },
      { text: "礼品卡", target: "gift" },
      { text: "更多>", target: "mywallet-more" },
    ],
  },
  {
    title: "我的关注",
    data: [
      { text: "关注商品", target: "watching-goods" },
      { text: "关注店铺", target: "watching-store" },
    ],
  },
  {
    title: "我的活动",
    data: [
      { text: "我的预约", target: "reserve" },
      { text: "我的拍卖", target: "paimai" },
      { text: "我的回收单", target: "recycle" },
      { text: "我的必购码", target: "purchase-code" },
      { text: "我的口令", target: "myCode" },
      { text: "更多>", target: "event-more" },
    ],
  },
  {
    title: "客户服务",
    data: [
      { text: "返修退换货", target: "return" },
      { text: "价格保护", target: "price-protact" },
      { text: "我的发票", target: "my-ticket" },
      { text: "购买咨询", target: "consultion" },
      { text: "交易纠纷", target: "conflict" },
      { text: "更多", target: "service-more" },
    ],
  },
  {
    title: "特色业务",
    data: [
      { text: "我的营业厅", target: "myService-center" },
      { text: "京东通讯", target: "communication" },
      { text: "医疗服务", target: "treatment" },
      { text: "更多", target: "feture-more" },
    ],
  },
];
</script>

<style scoped lang="less">
.menu-container {
  width: 100%;
  padding: 10px;
  .item {
    margin: 20px 0px;
    .title {
      font-size: 16px;
      margin-bottom: 5px;
      color: #000;
      font-weight: bold;
    }
    .menu-item {
      margin-top: 3px;
      cursor: pointer;
      &:hover {
        color: @baseColor;
      }
    }
  }
}
</style>
