<template>
  <div class="recommondation-container">
    <div class="title">为你推荐</div>
    <div class="recommon-body">
      <div class="recommon-navbar">
        <NavBar />
      </div>
      <div class="recommon-data">
        <Recommon :data="props.data" :total="props.total" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "./NavBar.vue";
import Recommon from "./Recommon.vue";
import {
  RecommondationChild,
  RecommondationHot,
} from "../../../../types/recommondation";

interface PropsType {
  data: RecommondationChild[] | RecommondationHot[];
  total: number;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.recommondation-container {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0px;

  .title {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    color: #000;
    font-weight: 1200;
  }

  .recommon-body {
    width: 100%;
    box-sizing: border-box;

    .recommon-navbar {
      width: 100%;
      height: 60px;
      background-color: #fff;
      display: flex;
      justify-content: center;
    }

    .recommon-data {
      margin-top: 20px;
    }
  }
}
</style>
