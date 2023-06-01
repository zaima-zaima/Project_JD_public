<template>
  <div class="goods-not-found">
    <Icon :type="StyleType.cartEmpty" :size="60" />
    <div class="tip">尚未找到与该关键词有关的商品，换个关键词试试吧</div>
  </div>
</template>

<script setup lang="ts">
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
</script>

<style scoped lang="less">
.goods-not-found {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .tip {
    font-size: 25px;
  }
}
</style>
