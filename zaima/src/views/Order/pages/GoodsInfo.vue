<template>
  <div class="goods-info-container">
    <div class="goods">
      <div class="thumb">
        <img
          :src="props.data.goods && props.data.goods.thumbs[0]"
          v-lazy
          alt=""
        />
      </div>
      <div class="goods-detail">
        <span>本订单由第三方卖家为您发货</span>
        <span>送货方式：快递运输</span>
        <span>承运人：无法跟踪物流你信息</span>
        <span>承运人电话：无</span>
        <span
          >运货单号：{{
            props.data.deliverNo ? props.data.deliverNo : "未指派"
          }}</span
        >
      </div>
    </div>
    <div class="deliver">无法跟踪订单货运信息</div>
  </div>
</template>

<script setup lang="ts">
import { Order } from "../../../types/order";

interface PropsType {
  data: Order;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.goods-info-container {
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  height: 280px;
  box-sizing: border-box;
  padding: 40px 10px;
  .goods {
    width: 400px;
    height: 100%;
    // background-color: red;
    display: flex;
    .thumb {
      width: 100px;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-detail {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      span {
        margin-top: 10px;
      }
    }
  }
  .deliver {
    flex: 1 0 auto;
    height: 100%;
    // background-color: green;
  }
}
</style>
