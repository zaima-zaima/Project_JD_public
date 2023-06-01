<template>
  <div class="menu-container">
    <div class="menu-title">
      <span>部门</span>
      <span>总计：{{ props.data.length }}个部门</span>
    </div>
    <div class="menu-content">
      <div
        class="menu-item pointer"
        :class="{ active: state.active === index }"
        v-for="(item, index) in props.data"
        @click="changeActive(index, item)"
      >
        <span class="name">{{ item.name }}</span
        ><span class="count">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Department } from "../../types/Department";

interface PropsType {
  data: Department[];
}

const props = defineProps<PropsType>();
const emits = defineEmits(["fetchAdmin"]);

const state = reactive({
  active: 0,
});

function changeActive(index: number, item: Department) {
  state.active = index;
  emits("fetchAdmin", item);
}
</script>

<style scoped lang="less">
.menu-container {
  width: 100%;
  background-color: #eae4e4;
  .menu-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
    position: sticky;
    left: 0;
    top: 0;
  }
  .menu-content {
    width: 100%;
    max-height: 600px;
    overflow-y: scroll;
    .menu-item {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: @baseColor;
        color: #fff;
      }
    }
  }
}
</style>
