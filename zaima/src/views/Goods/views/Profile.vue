<template>
  <div class="profile-container">
    <Loading :size="200" v-if="state.loading" />
    <div class="production-profile" v-else>
      <div class="profile">
        <div class="brand">品牌：{{ state.data.brand }}</div>
        <div class="infos">
          <div class="info-item">商品编号: {{ state.data.no }}</div>
          <div class="info-item">重量：{{ state.data.weight }} kg</div>
          <div class="info-item">
            来源：{{ state.data.region === "internal" ? "国产" : "进口" }}
          </div>
          <div class="info-item">
            适用人群：{{
              state.data.approperate === "normal"
                ? "通用"
                : state.data.approperate === "baby"
                ? "婴儿"
                : state.data.approperate === "child"
                ? "儿童"
                : "成人"
            }}
          </div>
          <div class="info-item">材料：{{ state.data.ingradient }}</div>
        </div>
      </div>
      <div class="brand">
        <div class="brand-item" v-for="item in state.data.desc">
          <img :src="item" v-lazy alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, reactive } from "vue";
import { useRoute } from "vue-router";
import { getGoodsById } from "../../../api/goods";
import { Goods } from "../../../types/Goods";
import Loading from "../../../components/Loading.vue";

const route = useRoute();

const state = reactive({
  data: {} as Goods,
  loading: false,
});

watchEffect(async () => {
  state.loading = true;
  state.data = (await getGoodsById(
    route.params.id as string
  )) as unknown as Goods;
  state.loading = false;
});
</script>

<style scoped lang="less">
.profile-container {
  min-height: 600px;
}

.production-profile {
  width: 100%;
  height: 100%;

  .profile {
    width: 100%;
    // height: 200px;
    display: flex;
    flex-direction: column;

    .infos {
      flex: 1;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-top: 10px;

      .info-item {
        flex: 0 0 25%;
      }
    }
  }

  .brand {
    width: 100%;
    margin-top: 20px;

    .brand-item {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}
</style>
