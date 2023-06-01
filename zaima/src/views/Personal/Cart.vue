<template>
  <div class="cart-container">
    <div class="icon"><Icon :type="StyleType.cartFiled" :size="20" /></div>
    <div class="title">我的购物车</div>
    <div class="badge">10</div>
  </div>
</template>

<script setup lang="ts">
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
</script>

<style scoped lang="less">
.cart-container {
  width: 150px;
  height: 30px;
  margin: 0px 30px;
  display: flex;
  justify-content: center;
  background-color: rgb(247, 247, 247);
  box-sizing: border-box;
  border: 1px solid #ccc;
  align-items: center;
  .icon {
    color: @baseColor;
  }
  .title {
    margin: 0px 5px;
  }

  .badge {
    padding: 5px;
    background: @baseColor;
    border-radius: 50%;
    color: #fff;
  }
}
</style>
