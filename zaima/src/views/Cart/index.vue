<template>
  <div class="cart-container">
    <div class="cart-content">
      <div class="banner">
        <div class="img">
          <img :src="logo" alt="" />
        </div>
        <div class="search-container">
          <Search />
        </div>
      </div>
      <Table />
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from "../Home/components/Search/Search.vue";
import Table from "./Table.vue";
import logo from "/src/assets/logo.png";
</script>

<style scoped lang="less">
.cart-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  .cart-content {
    width: 1200px;
    height: 100%;
    // background-color: red;
    .banner {
      width: 100%;
      height: 150px;
      //   background-color: green;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img {
        width: 190px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .search-container {
        width: 360px;
      }
    }
  }
}
</style>
