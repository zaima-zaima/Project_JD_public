<template>
  <div class="success-container">
    <div class="success-icon">
      <el-result icon="success" title="提交成功" />
    </div>

    <span>等待超级管理员 / leader批准你的注册请求，批准后即可登录</span>
    <span class="login" @click="goLogin">去登录</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goLogin() {
  router.push({
    name: "Login",
  });
}
</script>

<style scoped lang="less">
.success-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login {
    margin-top: 40px;
    color: @baseColor;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
