<template>
  <div class="func-menu-container">
    <div
      class="func-menu-item"
      v-for="(item, index) in state.functionMenu"
      :key="item.id"
    >
      <FuncItem :data="item" :hover="state.hover[index]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FuncItem from "./FuncItem.vue";
import { FunctionMenu } from "../../../../types/functionMenu";
import { reactive } from "vue";
import cardDefalut from "/src/assets/card_default.png";
import institution_default from "/src/assets/institution_default.png";
import call_default from "/src/assets/call_default.png";
import baitiao_default from "/src/assets/baitiao_default.png";
import game_default from "/src/assets/game_default.png";
import plane_default from "/src/assets/plane_default.png";
import gas_default from "/src/assets/gas_default.png";
import train_default from "/src/assets/train_default.png";
import wujin_default from "/src/assets/wujin_default.png";
import card_hover from "/src/assets/card_hover.png";
import institution_hover from "/src/assets/institution_hover.png";
import call_hover from "/src/assets/call_hover.png";
import baitiao_hover from "/src/assets/baitiao_hover.png";
import game_hover from "/src/assets/game_hover.png";
import plane_hover from "/src/assets/plane_hover.png";
import gas_hover from "/src/assets/gas_hover.png";
import train_hover from "/src/assets/train_hover.png";
import wujin_hover from "/src/assets/wujin_hover.png";

const state = reactive({
  functionMenu: [
    { url: cardDefalut, path: "/", text: "礼品卡" },
    {
      url: institution_default,
      path: "/",
      text: "企业购",
    },
    { url: call_default, path: "/", text: "话费" },
    { url: baitiao_default, path: "/", text: "白条" },
    { url: game_default, path: "/", text: "游戏" },
    { url: plane_default, path: "/", text: "机票" },
    { url: gas_default, path: "/", text: "加油" },
    { url: train_default, path: "/", text: "火车票" },
    { url: wujin_default, path: "/", text: "五金城" },
  ] as FunctionMenu[],
  hover: [
    { url: card_hover, path: "/", text: "礼品卡" },
    {
      url: institution_hover,
      path: "/",
      text: "企业购",
    },
    { url: call_hover, path: "/", text: "话费" },
    { url: baitiao_hover, path: "/", text: "白条" },
    { url: game_hover, path: "/", text: "游戏" },
    { url: plane_hover, path: "/", text: "机票" },
    { url: gas_hover, path: "/", text: "加油" },
    { url: train_hover, path: "/", text: "火车票" },
    { url: wujin_hover, path: "/", text: "五金城" },
  ] as FunctionMenu[],
});
</script>

<style scoped lang="less">
.func-menu-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .func-menu-item {
    flex: 0 0 33%;
  }
}
</style>
