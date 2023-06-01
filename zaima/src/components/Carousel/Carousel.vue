<template>
  <div class="Carousel-container" ref="CarouselCotainer">
    <div class="inner">
      <Move
        :data="state.data"
        :width="state.width"
        :height="state.height"
        :direaction="props.direaction"
        :auto="props.auto"
        @toggle="toggleHandle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EachData } from "./types/Carousel";
import Move from "./components/Move.vue";
import { reactive, ref, onMounted, Ref } from "vue";

interface CarouselProps {
  data: EachData[];
  auto?: boolean;
  direaction?: "column" | "row";
}

const props = withDefaults(defineProps<CarouselProps>(), {
  auto: true,
  direaction: "row",
});

const state = reactive({
  width: 0,
  height: 0,
  data: [] as EachData[],
  active: 0,
});

const CarouselCotainer = ref() as Ref<HTMLElement>;
state.data = [...props.data];
state.data.push(props.data[0]);

onMounted(() => {
  state.width = CarouselCotainer.value.offsetWidth;
  state.height = CarouselCotainer.value.offsetHeight;
});

function toggleHandle(indicator: number) {
  console.log(indicator);

  state.active = indicator;
}
</script>

<style scoped lang="less">
.Carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
}
</style>
