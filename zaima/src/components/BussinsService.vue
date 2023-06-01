<template>
  <div class="bussinsService-container">
    <div class="item">合作招商</div>
    <div class="item">学习中心</div>
    <div class="item">商家后台</div>
    <div class="item">京卖工作台</div>
    <div class="item">商家帮助</div>
    <div class="item">规则平台</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.bussinsService-container {
  width: 150px;
  height: 120px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      color: @baseColor;
    }
  }
}
</style>
