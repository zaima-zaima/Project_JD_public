<template>
  <div class="personal-banner-container">
    <div class="logo pointer">
      <div class="img" @click="goIndex">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="title">我的京东</div>
    </div>
    <div class="navigator">
      <div class="home">首页 <Icon :type="StyleType.arrowRightSmall" /></div>
      <div class="account-title">
        账户设置 <Icon :type="StyleType.arrowRightSmall" />
      </div>
    </div>
    <!-- <div class="searcher-and-cart">
      <Search />
    </div> -->
    <div class="cart-container">
      <div class="cart-title">
        <Cart />
      </div>
      <div class="line"></div>
      <div class="cart-content">
        <CartContent v-if="store.state.user" />
        <div class="notLogin" v-else>请登录后查看</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StyleType } from "../../types/enum";
import Icon from "../../components/Icon.vue";
import Search from "./Searcher.vue";
import { useRouter } from "vue-router";
import Cart from "../Home/components/Cart.vue";
import { useStore } from "vuex";
import CartContent from "../Home/components/CartContent.vue";

const store = useStore();

const router = useRouter();
function goIndex() {
  router.push({ path: "/" });
}
</script>

<style scoped lang="less">
.personal-banner-container {
  width: 1200px;
  height: 100%;
  //   background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 300px;
    height: 100%;
    // background-color: brown;
    display: flex;
    align-items: center;
    .img {
      width: 180px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 20px;
      box-sizing: border-box;
      padding: 10px;
    }
  }
  .navigator {
    flex: 1 0 auto;
    display: flex;
    justify-content: flex-start;
    margin-left: 100px;
    font-size: 18px;
    .home {
      font-size: inherit;
      margin-right: 30px;
    }
    .account-title {
      font-size: inherit;
    }
  }

  .searcher-and-cart {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .cart-container {
    width: 200px;
    box-shadow: 0px 0px 1px #000;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px 8px;
    cursor: pointer;
    z-index: 2;
    background-color: #fff;
    position: relative;

    .notLogin {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      .cart-title {
        border-bottom: 1px solid @border;
      }
      .cart-content {
        display: block;
      }
    }
    .cart-title {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      // border-bottom: 1px solid @border;
      .title {
        width: 100%;
        height: 1px;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      left: 0;
      bottom: 0;
      position: absolute;
      z-index: 9999;
      background-color: #fff;
    }
    .cart-content {
      width: 200%;
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 50px;
      box-shadow: 0 0 1px #000;
      box-sizing: border-box;
      padding: 10px;
      display: none;
    }
  }
}
</style>
