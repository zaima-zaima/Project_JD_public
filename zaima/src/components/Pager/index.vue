<template>
  <ul class="page-change-component" v-if="attrs.totalPage > 1">
    <li class="home" @click="changePage(ref(1))" :class="{ active: page == 1 }">
      首页
    </li>
    <li
      class="previous"
      @click="changePage(ref(attrs.prop.page - 1))"
      :class="{ active: attrs.prop.page == 1 }"
    >
      上一页
    </li>
    <li
      v-for="item in attrs.array"
      @click="changePage(ref(item))"
      :key="item"
      :class="{ active: item === attrs.prop.page }"
    >
      {{ item }}
    </li>
    <li
      class="next"
      @click="changePage(ref(attrs.prop.page + 1))"
      :class="{ active: attrs.prop.page === attrs.totalPage }"
    >
      下一页
    </li>
    <li
      class="end"
      @click="changePage(ref(attrs.totalPage))"
      :class="{ active: attrs.prop.page === attrs.totalPage }"
    >
      尾页
    </li>
  </ul>
</template>

<style lang="less" scoped>
@import "../../../src/colors.less";
.page-change-component {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 50px;
  margin-top: 20px;
  li {
    font-size: 16px;
    width: 35px;
    height: 35px;
    color: @link;
    background: #fff;
    margin: 0 10px;
    text-align: center;
    line-height: 35px;
    // padding: 0 10px;
    &::selection {
      background-color: #fff;
    }
    &:hover {
      background-color: @baseColor;
      color: #fff;
    }
    cursor: pointer;
    &.previous,
    &.next {
      width: 100px;
    }
    &.home,
    &.end {
      width: 50px;
      &.acitve {
        cursor: not-allowed;
        color: @disabled;
      }
    }
    &.active {
      color: @disabled;
      cursor: text;
    }
    &.active:hover {
      background-color: #fff;
    }
  }
}
</style>

<script setup lang="ts">
import {
  defineProps,
  computed,
  ref,
  reactive,
  defineEmits,
  watchEffect,
  Ref,
} from "vue";

import createArrayOfPageNumber from "./utils/createArrayOfPageNumber";
import { getMinNumber, getMaxNumber } from "./utils/scope";

// 定义组件属性

const emit = defineEmits(["change"]);

interface Props {
  page: number;
  limit: number;
  visiable?: number;
  total: number;
}

const prop = withDefaults(defineProps<Props>(), {
  visiable: 10,
});

const attrs = reactive({
  prop,
  array: {},
  totalPage: 0,
});

// onBeforeMount(() => {

//   attrs.totalPage = Math.floor(attrs.prop.total / attrs.prop.limit);
//   console.log(attrs.totalPage);
// });

watchEffect(
  () => {
    // 生成数据页数范围

    attrs.totalPage = Math.ceil(attrs.prop.total / attrs.prop.limit);

    attrs.array = computed(() => {
      return createArrayOfPageNumber(
        getMinNumber(ref(attrs.prop.page), ref(attrs.prop.limit)),
        getMaxNumber(
          ref(attrs.prop.page),
          ref(attrs.prop.visiable),
          ref(attrs.totalPage),
          ref(attrs.prop.limit)
        )
      );
    });
  },
  {
    flush: "post",
  }
);

// 换页事件

function changePage(newPage: Ref<Number>) {
  if (+newPage.value < 1) {
    newPage = ref(1);
  } else if (+newPage.value > attrs.totalPage) {
    newPage = ref(attrs.totalPage);
  }

  if (attrs.prop.page === newPage.value) {
    return;
  }

  emit("change", +newPage.value);
}
</script>
