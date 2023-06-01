<template>
  <div class="hot-brand-container">
    <div class="select-hot">
      <div class="hot-title">精选热点</div>
    </div>
    <div class="select-body">
      <div class="select-body-item" v-for="item in props.data.data">
        <div class="sel-child">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RecommondationHot } from "../../../../types/recommondation";

interface PropsType {
  data: RecommondationHot;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.hot-brand-container {
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/sprite.png");
  background-size: 300% 200%;
  background-position-x: right;
  background-position-y: top;

  .select-hot {
    width: 100%;
    height: 50px;
    // background-color: red;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    .hot-title {
      padding: 5px 10px;
      background-color: @baseColor;
      border-radius: 20px;
      color: #fff;
      font-size: 16px;
    }
  }

  .select-body {
    width: 100%;
    height: 170px;
    // background-color: rgb(248, 143, 6);
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;

    .select-body-item {
      width: 50%;
      flex-shrink: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      .sel-child {
        width: 100px;
        height: 30px;
        border: 1px dashed #f8cccc;
        margin: 2px 0px;
        line-height: 30px;
        color: @baseColor;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background-color: @baseColor;
          color: #fff;
          border: none;
        }
      }
    }

  }
}
</style>
