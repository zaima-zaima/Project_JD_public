<template>
  <div class="personal-container">
    <div class="banner">
      <Banner />
    </div>
    <div class="body">
      <div class="body-inner">
        <div class="menu">
          <Menu />
        </div>
        <div class="content">
          <RouterView :key="Math.random()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "./Banner.vue";
import Menu from "./Menu.vue";
</script>

<style scoped lang="less">
.personal-container {
  width: 100%;

  .banner {
    width: 100%;
    height: 100px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .body {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .body-inner {
      width: 1200px;
      display: flex;

      .menu {
        width: 160px;
        height: fit-content;
        background: #fff;
        flex-shrink: 0;
      }

      .content {
        flex: 1 0 auto;
        margin-left: 20px;
      }
    }
  }
}
</style>
