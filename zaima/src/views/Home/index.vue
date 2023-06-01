<template>
  <div class="home-container">
    <Navigator />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, watchEffect } from "vue";
import { useStore } from "vuex";
import Navigator from "../../components/Navigator.vue";
const socket = getCurrentInstance()?.appContext.config.globalProperties.$socket;

const store = useStore();

watchEffect(() => {
  if (store.state.user) {
    socket.emit("userLogin", store.state.user);
  }
});
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
