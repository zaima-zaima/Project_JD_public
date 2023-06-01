<template>
  <div class="title-container">
    <div class="left">
      <el-icon>
        <slot name="default"></slot>
      </el-icon>

      <span class="title">{{ props.title }}</span>
    </div>
    <div class="right">
      <div class="userInfo">
        <div class="thumb"></div>
        <div class="user">
          {{ store.state.user && store.state.user.username }}
        </div>
        <div class="user-oprator">
          <div class="signout" @click="logout">登出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
const socket = getCurrentInstance()?.appContext.config.globalProperties.$socket;

interface PropsType {
  title: string;
}
const props = defineProps<PropsType>();
const store = useStore();

function logout() {
  socket.emit("logOut", store.state.user);
  store.commit("logout");
}
</script>

<style scoped lang="less">
.title-container {
  width: 100%;
  height: @titleHeight;
  background-color: @titleBgColor;
  box-sizing: border-box;
  padding: 0px 30px;
  color: #fff;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  .left {
    .title {
      margin-left: 10px;
    }
  }
  .right {
    .userInfo {
      width: 100px;
      text-align: center;
      position: relative;
      &:hover {
        background-color: #fff;
        color: #000;
        .user-oprator {
          display: block;
          cursor: pointer;
          position: absolute;
          z-index: 999;
          background-color: #fff;
          &:hover {
            color: @baseColor;
          }
        }
      }
      .user-oprator {
        width: 100%;
        padding: 5px;
        font-size: 14px;
        box-sizing: border-box;
        color: #000;
        box-shadow: 0px 0px 1px #000;
        display: none;
      }
    }
  }
}
</style>
