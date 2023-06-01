<template>
  <div class="slider-child-container">
    <div class="thumb-container">
      <img :src="props.child.thumb" v-lazy alt="" />
    </div>
    <div class="slider-child-title">{{ props.child.title }}</div>
    <div class="slider-child-price">
      ￥{{ (+props.child.price).toFixed(2) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SliderItem } from "../../../../types/miaosha";
interface PropsType {
  child: SliderItem;
}
const props = defineProps<PropsType>();

console.log(props.child);
</script>

<style scoped lang="less">
.slider-child-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  color: #000;
  cursor: pointer;
  &:hover {
    color: @baseColor;
  }
  .thumb-container {
    width: 100%;
    height: 85%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .slider-child-title {
    margin-top: 10px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: inherit;
  }
  .slider-child-price {
    // text-align: center;
    margin-top: 10px;
    color: @baseColor;
    font-weight: bold;
  }
}
</style>
