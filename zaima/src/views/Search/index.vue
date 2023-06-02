<template>
  <div class="search-container">
    <div class="banner">
      <Banner />
    </div>
    <div class="content">
      <div class="recommadation"></div>
      <div class="main" v-if="state.data.length !== 0 && !state.searching">
        <div
          class="item"
          @click="goGoodDetail(item)"
          v-for="item in state.data"
        >
          <GoodComp :data="item" />
        </div>
        <div class="pager-container">
          <Pager
            :total="state.total"
            :limit="+(route.query.limit as string)"
            :page="+(route.query.page as string)"
            @change="changePage"
          />
        </div>
      </div>
      <NotFound v-if="state.data.length === 0 && !state.searching" />
    </div>
    <Loading :size="200" text="请稍后..." v-if="state.searching" />
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchGoods } from "../../api/goods";
import { ResponseWithCount } from "../../types/response";
import { Goods } from "../../types/Goods";
import Banner from "../Home/components/Banner.vue";
import GoodComp from "../../components/Goods.vue";
import Pager from "../../components/Pager/index.vue";

import NotFound from "./NotFound.vue";
import Loading from "../../components/Loading.vue";
const route = useRoute();
const router = useRouter();
const state = reactive({
  total: 0,
  data: [] as Goods[],
  searching: false,
});

function goGoodDetail(Goods: Goods) {
  router.push({
    name: "Profile",
    params: {
      id: Goods.id,
    },
  });
}

watchEffect(async () => {
  if (route.query.page && route.query.limit) {
    state.searching = true;
    const resp = (await searchGoods(
      route.query.keyword as string,
      +route.query.page,
      +route.query.limit
    )) as unknown as ResponseWithCount<Goods>;

    state.searching = false;

    state.total = resp.count;
    state.data = resp.rows;
    console.log("resp:", resp);
  }
});

function changePage(newPage: number) {
  router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });
}
</script>

<style scoped lang="less">
.search-container {
  width: 100%;
  flex: 1;
  background-color: #fff;
  // background-color: red;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  .content {
    width: 1400px;
    height: 100%;
    // background-color: blue;
    margin-right: 200px;
    margin-top: 20px;
    display: flex;

    .recommadation {
      width: 200px;
      height: 100%;
      flex-shrink: 0;
    }

    .main {
      flex: 1 0 auto;
      width: 100%;
      background-color: rgb(241, 246, 246);
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 260px;
        height: 450px;
        box-sizing: border-box;
        // border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;
        background-color: #fff;

        &:hover {
          box-shadow: 0px 0px 1px #000;
          cursor: pointer;
        }
      }
      .pager-container {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
