<template>
  <div class="not-found">
    <div class="content">
      <div class="img-container">
        <img :src="PageNotFound" alt="" />
      </div>
      <div class="tips">
        <div class="c404">404</div>
        <div class="text">你访问的页面不存在！</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageNotFound from "/src/assets/page_notFound.png";
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  height: 100%;
  .content {
    flex: 1;
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tips {
      width: 300px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .c404 {
        font-size: 60px;
      }
      .text {
        font-size: 20px;
      }
    }
  }
}
</style>
