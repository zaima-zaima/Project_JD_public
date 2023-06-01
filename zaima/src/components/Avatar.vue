<template>
  <div class="avatar-container">
    <img :src="props.src" alt="" />
  </div>
</template>

<script setup lang="ts">
interface PropsType {
  src: string;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.avatar-container {
  width: 100%;
  height: 100% !important;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
