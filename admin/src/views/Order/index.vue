<template>
  <div class="order-container">
    <Title title="订单管理">
      <Edit />
    </Title>

    <Table
      :data="state.data"
      @update-order="setDeliver"
      :loading="state.loading"
      v-if="state.data.length !== 0 || state.loading"
    />

    <el-empty description="无数据" v-else />
    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="route.query.limit ? +route.query.limit : 10"
        :current-page="route.query.page ? +route.query.page : 1"
        @current-change="changePage"
        hide-on-single-page
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Title from "../../components/Title.vue";
import { fetchAllOrder, updateOrder } from "../../api/order";
import { Order, OrderStatus } from "../../types/order";
import { Edit } from "@element-plus/icons-vue";
import Banner from "./Banner.vue";
import Table from "./Table.vue";
import { ResponseWithCount } from "../../types/response";
import { ElMessageBox } from "element-plus";

const state = reactive({
  data: [] as Order[],
  total: 0,
  loading: false,
});

const route = useRoute();
const router = useRouter();

watchEffect(async () => {
  if (route.query.page && route.query.limit) {
    state.loading = true;
    const resp = (await fetchAllOrder(
      +route.query.page,
      +route.query.limit
    )) as unknown as ResponseWithCount<Order>;
    state.data = resp.rows;
    state.total = resp.count;
    state.loading = false;
  }
});

function changePage(page: number) {
  router.push({
    query: {
      ...route.query,
      page: page,
    },
  });
}

async function setDeliver(
  deliverNo: string,
  oid: string,
  callback: Function,
  closeModel: Function
) {
  const resp = (await updateOrder(oid, {
    status: OrderStatus.deliver,
    deliverNo,
  } as unknown as Order)) as any;

  if (!resp.code || resp.code === 0) {
    state.data = state.data.map((item) => {
      if (item.id === oid) {
        item.status = OrderStatus.deliver;
      }
      return item;
    });
    ElMessageBox.alert("发货成功");
    callback();
    closeModel();
  } else {
    ElMessageBox.alert("订单异常，发货失败");
    callback();
    closeModel();
  }
}
</script>

<style scoped lang="less">
.order-container {
  width: 100%;
  .banner {
    width: 100%;
    height: 40px;
  }

  .pager {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
