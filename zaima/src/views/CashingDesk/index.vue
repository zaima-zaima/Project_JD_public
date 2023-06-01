<template>
  <div class="cash-desk-container">
    <div class="cash-body">
      <div class="cash-brand">
        <div class="cash-brand-logo">
          <div class="img"><img :src="logo" alt="" /></div>
          <div class="cash-title">收银台</div>
        </div>
      </div>
      <OrderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import OrderInfo from "./components/orderInfo.vue";
import logo from "/src/assets/logo.png";
const store = useStore();
const router = useRouter();
watchEffect(() => {
  if (store.state.cartSelected.length === 0) {
    router.push({
      name: "Cart",
    });
  }
});
</script>

<style scoped lang="less">
.cash-desk-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  .cash-body {
    width: 1200px;
    .cash-brand {
      width: 100%;
      height: 160px;
      //   background-color: red;
      box-sizing: border-box;
      padding: 10px;
      .cash-brand-logo {
        width: 300px;
        height: 100%;
        // background-color: green;
        display: flex;
        align-items: center;
        .cash-title {
          font-size: 20px;
        }
        .img {
          width: 200px;
          height: 100%;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
