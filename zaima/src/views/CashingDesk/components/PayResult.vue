<template>
  <div class="result-container" :class="{ success: props.status }">
    <Icon
      :type="props.status ? StyleType.cartFiled : StyleType.cartEmpty"
      :size="60"
    />
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import { StyleType } from "../../../types/enum";
import Icon from "../../../components/Icon.vue";
interface PropsType {
  status: boolean;
  text: string;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.result-container {
  width: 300px;
  height: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.success {
    color: @baseColor!important;
  }

  span {
    color: inherit;
  }
}
</style>
