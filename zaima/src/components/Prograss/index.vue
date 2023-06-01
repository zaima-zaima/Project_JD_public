<template>
  <div class="prograss-container">
    <div
      class="prograss-item"
      :class="{ active: current >= index + 1 }"
      v-for="(item, index) in props.steps"
    >
      <div class="indicator">{{ index + 1 }}</div>
      <div class="prograss-item-text">{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PropsType {
  steps: string[];
  current: number;
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
@activeColor: rgb(49, 232, 3);
.prograss-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  .prograss-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    &.active {
      .indicator {
        color: #fff;
        background-color: @activeColor;
      }
      .prograss-item-text {
        color: @activeColor;
      }
    }
    .indicator {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #000;
      margin-bottom: 10px;
    }
  }
}
</style>
