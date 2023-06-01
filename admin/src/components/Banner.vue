<template>
  <div class="header">
    <div class="header-inner">
      <div class="title-box">
        <div class="logo-container" @click="goLogin">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="login-text">{{ props.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

interface PropsType {
  text: string;
}
const props = defineProps<PropsType>();
const router = useRouter();

function goLogin() {
  router.push({ name: "Login" });
}
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: center;

  .header-inner {
    width: 900px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .title-box {
      width: 400px;
      height: 100%;
      display: flex;
      align-items: center;

      .logo-container {
        width: 200px;
        height: 100%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .login-text {
        font-size: 30px;
      }
    }

    .tip {
      align-self: flex-end;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: @baseColor;
      }

      .surver {
        margin-left: 5px;
        color: inherit;
      }
    }
  }
}
</style>
