<template>
  <div class="home-container">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import router from "./router";
import roler from "../../server/configure/roler";

const route = useRoute();

watchEffect(() => {
  if (route.meta.auth) {
    const token = localStorage.getItem("token");

    if (!token)
      router.push({
        name: "Login",
        query: { sign: roler.user, from: route.fullPath },
      });
  }
});
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  // height: 100%;
  background-color: @bgColor;
}
</style>
