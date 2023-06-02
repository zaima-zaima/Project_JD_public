<template>
  <div class="overrall-charts-container">
    <div class="charts">
      <Echarts
        x-axis-type="category"
        :titles="state.adminTraceTitle"
        series-type="line"
        :values="state.adminTraceValue"
        title="管理员增量趋势"
      />
    </div>

    <div class="charts">
      <Echarts
        x-axis-type="category"
        :titles="state.goodsSodeFrequentCountTitle"
        series-type="pie"
        :values="state.goodsSodeFrequentCountValue"
        title="商品售出热度"
      />
      <span class="tip"
        >提示：该数据是来源于不同用户购买相同产品次数，一个用户购买一次购买多件，算一次</span
      >
    </div>
    <div class="charts">
      <Echarts
        x-axis-type="category"
        :titles="state.goodsSodeCountTitle"
        series-type="bar"
        :values="state.goodsSodeCountValue"
        title="商品销量趋势"
      />
    </div>
    <div class="charts">
      <Echarts
        x-axis-type="category"
        :titles="state.orderCountTitle"
        series-type="bar"
        :values="state.orderCountValue"
        title="用户订单量排行"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { fetchAdminByOrder } from "../../../api/admin";
import Echarts from "../../../components/Echarts.vue";
import { getGoodsFrequentCount, getGoodsSoldCount } from "../../../api/goods";
import { fetchOrderCountByUser } from "../../../api/order";

const state = reactive({
  adminTraceTitle: [] as any,
  adminTraceValue: [] as any,
  goodsSodeFrequentCountTitle: [] as any,
  goodsSodeFrequentCountValue: [] as any,
  goodsSodeCountTitle: [] as any,
  goodsSodeCountValue: [] as any,
  orderCountTitle: [] as any,
  orderCountValue: [] as any,
});

onMounted(async () => {
  const adminTrace = (await fetchAdminByOrder()) as unknown as {
    days: string;
    count: number;
  }[];

  const goodsSold = (await getGoodsFrequentCount()) as unknown as {
    name: string;
    count: number;
  }[];

  const goodsSoldCount = (await getGoodsSoldCount()) as unknown as any[];

  const orderCount = (await fetchOrderCountByUser()) as unknown as any[];

  state.adminTraceTitle = adminTrace.map((ele) => ele.days) as any[];
  state.adminTraceValue = adminTrace.map((ele) => ele.count) as any[];

  state.goodsSodeFrequentCountTitle = goodsSold.map((ele) => ele.name) as any;
  state.goodsSodeFrequentCountValue = goodsSold.map((ele) => ele.count) as any;

  state.goodsSodeCountTitle = goodsSoldCount.map((ele) => ele.name) as any;
  state.goodsSodeCountValue = goodsSoldCount.map((ele) => ele.sold) as any;

  state.orderCountTitle = orderCount.map((ele) => ele.name) as any;
  state.orderCountValue = orderCount.map((ele) => ele.count) as any;
});
</script>

<style scoped lang="less">
.overrall-charts-container {
  width: 100%;
  display: flex;
  padding: 10px 20px;
  height: 500px;
  flex-wrap: wrap;

  .charts {
    flex: 0 0 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 100px;
    .tip {
      font-size: 13px;
    }
  }
}
</style>
