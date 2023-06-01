<template>
  <div
    class="func-item-container"
    @mouseenter="mouseenterHandle"
    @mouseleave="mouseLeaveHandle"
  >
    <div class="img-container">
      <img :src="state.currentData.url" alt="" />
    </div>
    <div class="text">{{ state.currentData.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { FunctionMenu } from "../../../../types/functionMenu";
import { reactive } from "vue";

interface PropsType {
  data: FunctionMenu;
  hover: FunctionMenu;
}

const props = defineProps<PropsType>();

const state = reactive({
  currentData: props.data,
});

function mouseenterHandle() {
  state.currentData = props.hover;
}

function mouseLeaveHandle() {
  state.currentData = props.data;
}
</script>

<style scopedd lang="less">
.func-item-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: @baseColor;
  }
  .text {
    color: inherit;
  }
  .img-container {
    // width: 60px;
    height: 60px;
    box-sizing: border-box;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
