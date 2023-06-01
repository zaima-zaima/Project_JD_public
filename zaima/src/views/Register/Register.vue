<template>
  <div class="register-container">
    <div class="navigator">
      <Navigator />
    </div>
    <div class="form-container">
      <RegisterForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navigator from "./Navigator.vue";
import RegisterForm from "./RegisterForm.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

router.push({
  query: {
    ...route.query,
    step: 1,
  },
});
</script>

<style scoped lang="less">
.register-container {
  width: 100%;

  .navigator {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }

  .form-container {
    width: 100%;
    height: 500px;
    background-color: #fff;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
