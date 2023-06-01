<template>
  <div class="home-container">
    <Layout>
      <template v-slot:left>
        <Menu />
      </template>
      <template v-slot>
        <RouterView />
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, watchEffect } from "vue";
import Layout from "../components/Layout.vue";

import Menu from "../components/Menu.vue";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
const socket = getCurrentInstance()?.appContext.config.globalProperties.$socket;
const store = useStore();

const state = reactive({
  relTimeNotification: false,
  waitingListNotification: false,
  waitingListMsg: "",
  realTimeMsg: "",
});

socket.on("registion", (msg: string) => {
  state.relTimeNotification = true;
  state.realTimeMsg = msg;
});

watchEffect(() => {
  if (state.relTimeNotification) {
    ElNotification({
      title: "实时消息",
      message: state.realTimeMsg,
      duration: 0,
      onClose: () => {
        state.realTimeMsg = "";
        state.relTimeNotification = false;
      },
    });
  }

  if (store.state.user) {
    socket.emit("userLogin", store.state.user);
  }

  if (state.waitingListNotification) {
    ElNotification({
      title: "待处理",
      message: state.waitingListMsg,
      duration: 0,
      onClose: () => {
        state.waitingListMsg = "";
        state.waitingListNotification = false;
      },
    });
  }

  if (store.state.user) {
    socket.emit("login", store.state.user);
  }
});

socket.on("waitingList", (msg: string) => {
  ElNotification({
    title: "待处理",
    message: msg,
    duration: 0,
  });
});

socket.on("transfer", (msg: string) => {
  ElNotification({
    title: "部门转交",
    message: msg,
    duration: 0,
  });
});
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;

  &::-webkit-scroll {
    display: none;
    width: 0;
  }

  & ::-webkit-scrollbar-track {
    background-color: #f5f5f5;

    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);

    border-radius: 5px;
  }
}
</style>
