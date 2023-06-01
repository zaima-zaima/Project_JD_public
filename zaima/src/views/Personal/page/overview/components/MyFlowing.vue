<template>
  <div class="my-flowing-container">
    <div class="title">我的关注</div>
    <div class="content">
      <div class="item pointer hover-base purchase-flowing">
        <div class="count">0</div>
        <div class="tip">商品关注</div>
      </div>
      <div class="item pointer hover-base store-flowing">
        <div class="count">0</div>
        <div class="tip">店铺关注</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.my-flowing-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid @border;
    padding-left: 20px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
  }

  .content {
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
      margin: 0px 15px;
      font-size: 16px;
      text-align: center;
      .count {
        color: inherit;
      }
    }
  }
}
</style>
