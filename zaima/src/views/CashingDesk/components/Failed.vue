<template>
  <div class="failed-container">
    <Icon :type="StyleType.cartEmpty" :size="60" />
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import Icon from "../../../components/Icon.vue";
import { StyleType } from "../../../types/enum";

interface PropsType {
  text: string;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.failed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(245, 9, 9);
  span {
    color: inherit;
    margin-top: 20px;
    font-size: 30px;
  }
}
</style>
