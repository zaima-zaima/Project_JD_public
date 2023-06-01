<template>
  <div class="echarts-container" ref="echartBox"></div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from "vue";
import { createCurve } from "../utils/echartsCreator";

interface PropsType {
  xAxisType: string;
  seriesType: string;
  titles: any[];
  values: any[];
  title: string;
}

const props = defineProps<PropsType>();

const echartBox = ref() as Ref<HTMLElement>;

onMounted(() => {
  watchEffect(() => {
    createCurve(
      echartBox.value,
      props.xAxisType,
      props.titles,
      props.values,
      props.seriesType,
      props.title
    );
  });
});
console.log("sdf");
</script>

<style scoped lang="less">
.echarts-container {
  width: 100%;
  height: 100%;
}
</style>
