<template>
  <div class="model-container" v-if="props.show">
    <div class="mask"></div>
    <div class="slot">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PropsType {
  show: boolean;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.model-container {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
    z-index: 1;
  }
  .slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1001;
  }
}
</style>
