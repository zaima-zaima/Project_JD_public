<template>
  <div class="loading-container">
    <img :src="LoadingSrc" :width="props.size" :height="props.size" alt="" />
    <span v-if="props.text">{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import LoadingSrc from "/src/assets/loading.jpeg";

interface PropsType {
  size: number;
  text?: string;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    margin-top: 20px;
    font-size: 30px;
    color: rgb(20, 168, 237);
  }
}
</style>
