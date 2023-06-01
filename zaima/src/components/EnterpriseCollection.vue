<template>
  <div class="enterprise-collection">
    <div class="item">企业购</div>
    <div class="item">公共采购</div>
    <div class="item">工业品</div>
    <div class="item">商用场景馆</div>
    <div class="item">礼品卡</div>
    <div class="item">微信企业购</div>
    <div class="item">工品优选</div>
    <div class="item">京东锦礼</div>
    <div class="item">企业购专业版</div>
    <div class="item">大中型客户采购</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.enterprise-collection {
  width: 150px;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;

  .item {
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      color: @baseColor;
    }
  }
}
</style>
