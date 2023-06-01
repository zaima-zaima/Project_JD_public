<template>
  <div class="complate-container">
    <div class="complate-icon">
      <Icon :type="StyleType.success" :size="70" />
    </div>
    <div class="complate-title">注册完成</div>
    <div class="complate-description">
      将在<span>{{ store.state.timer }}</span
      >秒后自动跳转到登录页面
    </div>
    <div class="routerTo" @click="goLogin">立即跳转</div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";

const router = useRouter();
const store = useStore();

store.dispatch("startTimer", 10);

watchEffect(() => {
  if (store.state.timer === 0) {
    goLogin();
  }
});

function goLogin() {
  router.push({
    name: "Login",
  });
}
</script>

<style scoped lang="less">
.complate-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //   background: red;
  flex-direction: column;

  .complate-icon {
    color: rgb(171, 222, 94);
  }

  .complate-title {
    margin-top: 20px;
    font-size: 22px;
    font-weight: bolder;
    color: @baseColor;
  }

  .complate-description {
    margin-top: 20px;

    span {
      color: #000;
    }
  }

  .routerTo {
    margin-top: 20px;
    color: @baseColor;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
