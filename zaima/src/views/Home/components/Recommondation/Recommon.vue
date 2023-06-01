<template>
  <div class="recommon-container">
    <div class="recommon-item" v-for="item in props.data">
      <HotBrand v-if="item.isHot" :data="item as unknown as RecommondationHot" />
      <RecommonChild v-else :data="item as unknown as RecommondationChild" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HotBrand from "./HotBrand.vue";
import RecommonChild from "./RecommonChild.vue";

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
.recommon-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .recommon-item {
    flex: 0 0 25%;
    height: 360px;
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
