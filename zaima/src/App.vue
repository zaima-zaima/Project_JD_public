<template>
  <div class="home-container">
    <RouterView />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.home-container {
  width: 100%;
  // height: 100%;
  background-color: @bgColor;
}
</style>
