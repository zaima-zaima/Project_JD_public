<template>
  <div class="login-ByGithub-jumping-container">
    <Loading :size="320" text="请稍后" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jumping } from "../api/login";
import Loading from "../components/Loading.vue";
const route = useRoute();
const router = useRouter();
const state = reactive({
  login: false,
});

(async () => {
  const resp = (await jumping(route.query.code as string)) as any;

  if (resp.code && resp.code !== 0) {
    router.push({
      name: "Login",
      query: {
        status: "failed",
      },
    });
    return;
  }

  router.push("/");
})();
</script>

<style scoped lang="less">
.login-ByGithub-jumping-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
