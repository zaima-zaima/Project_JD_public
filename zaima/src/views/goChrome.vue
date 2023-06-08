<template>
  <div class="go-chrome" ref="container">
    <img :src="logo" alt="" />
    <span
      >你使用的似乎不是谷歌浏览器，为了更好的用户体验，请在谷歌浏览器中访问本站</span
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import logo from "../assets/chrome.webp";
import { useRouter } from "vue-router";

const container = ref();
const router = useRouter();

if (navigator.vendor === "Google Inc.") {
  router.push("/");
}

onMounted(() => {
  container.value.style.width = document.documentElement.clientWidth + "px";
  container.value.style.height = document.documentElement.clientHeight + "px";
});
</script>

<style scoped lang="less">
.go-chrome {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin-top: 30px;
    font-size: 30px;
  }
}
</style>
