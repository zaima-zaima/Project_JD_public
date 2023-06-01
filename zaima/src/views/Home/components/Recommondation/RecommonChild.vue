<template>
  <div class="recommonChild-container">
    <div class="mask">
      <div class="inner-mask"></div>
    </div>
    <div class="img-container">
      <img :src="props.data.thumb" v-lazy alt="" />
    </div>
    <div class="title">
      <span class="self_tag" v-if="props.data.isSelf">自营</span>
      {{ props.data.title }}
    </div>
    <div class="price-container">￥{{ (+props.data.price).toFixed(2) }}</div>
  </div>
</template>

<script setup lang="ts">
import { RecommondationChild } from "../../../../types/recommondation";

interface PropsType {
  data: RecommondationChild;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.recommonChild-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
  position: relative;

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.2;

    .inner-mask {
      width: 100%;
      height: 100%;
      // background-color: red;
      // opacity: 1;
    }
  }

  .img-container {
    width: 100%;
    height: 70%;
    // background-color: #d60505;
    box-sizing: border-box;
    padding: 30px 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    height: 40px;
    box-sizing: border-box;
    padding: 0px 5px;
    line-height: 20px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;

    .self_tag {
      padding: 2px 4px;
      background-color: @baseColor;
      color: #fff;
      margin-right: 5px;
      font-weight: bold;
    }
  }

  .price-container {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    padding-left: 4px;
    line-height: 30px;
    color: @baseColor;
  }
}
</style>
