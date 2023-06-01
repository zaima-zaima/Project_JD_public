<template>
  <div class="empty-container">
    <Icon :type="StyleType.cartFiled" :size="props.size" />
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import { StyleType } from "../types/enum";
import Icon from "./Icon.vue";

interface PropsType {
  text: string;
  size?: number;
}

const props = withDefaults(defineProps<PropsType>(), {
  size: 30,
});
</script>

<style scoped lang="less">
.empty-container {
  width: 100%;
  height: 300px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
