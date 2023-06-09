<template>
  <div class="goods-manage-container">
    <Title title="商品管理" />
    <div class="toolsBar">
      <div class="total">商品总量: {{ state.total }}</div>
    </div>
    <div class="content">
      <Table
        :data="state.data"
        :total="state.total"
        :loading="state.loading"
        @remove="toggleDeleteGoods"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../../../components/Title.vue";
import { getGoods, removeGoods } from "../../../api/goods";
import { useRoute } from "vue-router";
import { reactive, watchEffect } from "vue";
import { ResponseWithCount } from "../../../types/response";
import { Goods } from "../../../types/Goods";
import Table from "./Table.vue";
import { ElMessageBox } from "element-plus";

const route = useRoute();
const state = reactive({
  data: [] as Goods[],
  total: 0,
  loading: false,
});

watchEffect(async () => {
  if (route.query.page && route.query.limit) {
    state.loading = true;
    const resp = (await getGoods(
      +route.query.page || 1,
      +route.query.limit || 10
    )) as unknown as ResponseWithCount<Goods>;
    state.total = resp.count;
    state.data = resp.rows as Goods[];
    state.loading = false;
  }
});

async function toggleDeleteGoods(goods: Goods) {
  const resp = (await removeGoods(goods.id as string)) as any;

  if (resp.code && resp.code !== 0) {
    ElMessageBox.alert("删除错误，请稍后重试");
    return;
  }

  state.data = state.data.filter((ele) => ele.id !== goods.id);
  state.total = state.data.length;
  ElMessageBox.alert("删除成功!");
}
</script>

<style scoped lang="less">
.goods-manage-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .toolsBar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;
  }
  .content {
    width: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    // padding: 20px;
    .goods-item {
      margin: 10px;
    }
  }
}
</style>
