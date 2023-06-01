<template>
  <div class="star-container">
    <div
      class="star pointer"
      :class="{ active: index <= state.current }"
      @mouseover="handleHover(index)"
      v-for="(start, index) in props.count"
    >
      <Icon :type="StyleType.star" :size="props.size" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { StyleType } from "../types/enum";
import Icon from "./Icon.vue";

interface PropsType {
  count: number;
  size?: number;
  current?: number;
  disabled: boolean;
}

const props = withDefaults(defineProps<PropsType>(), {
  size: 20,
  current: -1,
  disabled: false,
});

const state = reactive({
  current: 0,
});

const emits = defineEmits(["starRecive"]);

state.current = props.current;

function handleHover(index: number) {
  if (props.disabled) {
    return;
  }
  state.current = index;
  emits("starRecive", index);
}
</script>

<style scoped lang="less">
.star-container {
  display: flex;
  .star {
    margin: 3px;
    &.active {
      color: @baseColor;
    }
  }
}
</style>
