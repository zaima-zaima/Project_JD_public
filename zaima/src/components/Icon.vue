<template>
  <span
    :style="{ fontSize: props.size ? props.size + 'px' : 10 + 'px' }"
    :class="`iconfont icon-${fonts[props.type]}`"
  ></span>
</template>

<script setup lang="ts">
import { StyleType } from "../types/enum";

interface PropsType {
  type: StyleType;
  size?: number;
}

const props = defineProps<PropsType>();

console.log(props.type);

const fonts = {
  camera: "zhaoxiangji",
  local: "weizhi",
  cartFiled: "gouwuche",
  chat: "chat",
  search: "fangdajing",
  arrowUp: "xiangshangjiantou",
  arrowDown: "icon-xiangshangjiantou",
  view: "view",
  arrowRight: "zuojiantou",
  cartEmpty: "gouwuche1",
  edit: "edit",
  arrowRightSmall: "youjiantou",
  arrowLeftSmall: "zuojiantou1",
  arrowRightBold: "youjiantou1",
  star: "star-fill",
  info: "info",
  user: "user",
  lock: "lock",
  github: "github",
  error: "error",
  success: "success_fill",
  arrowRightDireactor: "youjiantou2",
  huangguan: "huangguan",
  store: "store",
} as any;
</script>

<style scopedd lang="less">
@import "//at.alicdn.com/t/c/font_3925574_hrfmlsf27h8.css";

.iconfont {
  color: inherit;
  font-weight: inherit;
  // font-size: inherit;
}
</style>
