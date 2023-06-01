<template>
  <div class="life-service-container">
    <div class="title">生活服务</div>
    <div class="content">
      <!-- <Carousel :data="[]" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Carousel from "../../../../../components/Carousel/Carousel.vue";
</script>

<style scoped lang="less">
.life-service-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid @border;
    line-height: 50px;
    padding-left: 30px;
    font-size: 18px;
    color: #000;
  }

  .content {
    flex: 1 1 auto;
  }
}
</style>
