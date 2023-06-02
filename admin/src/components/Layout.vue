<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;

  .main {
    width: calc(100% - 200px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .left,
  .right {
    flex: 0 0 auto;
  }
}
</style>
