<template>
  <div class="deliver-info-container">
    <div class="deliver-info-item">
      <div class="title">收货人信息：</div>
      <div class="personal">收货人: {{ props.data.deliverName }}</div>
      <div class="address">
        地址:
        {{
          props.data.deliverAddress &&
          (props.data.deliverAddress as any).province +
            (props.data.deliverAddress as any).city +
            ((props.data.deliverAddress as any).area
              ? (props.data.deliverAddress as any).area
              : " ") +
            (props.data.deliverAddress as any).detail
        }}
      </div>
      <div class="phone">手机号码: {{ props.data.deliverPhone }}</div>
    </div>
    <div class="deliver-info-item">
      <div class="title">配送信息</div>
      <div class="deliver-method">配送方式: 快速运输</div>
      <div class="deliver-date">
        期望收货日期：工作日、双休日与节假日均可送货
      </div>
    </div>
    <div class="deliver-info-item">
      <div class="title">付款信息</div>
      <div class="payment">
        付款方式:
        {{ props.data.payment === "online" ? "在线支付" : "白条支付" }}
      </div>
      <div class="date">
        订单提交时间: {{ formatDate(props.data.createdAt, false, "-", true) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Order } from "../../../types/order";
import formatDate from "../../../utils/formatDate";

interface PropsType {
  data: Order;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.deliver-info-container {
  width: 100%;
  display: flex;
  background-color: #fff;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 10px;
  .deliver-info-item {
    flex: 0 0 33%;
    .title {
      font-size: 13px;
      margin-bottom: 10px;
      font-weight: bold;
      color: #000;
    }
    div {
      width: 60%;
      margin-top: 10px;
    }
  }
}
</style>
