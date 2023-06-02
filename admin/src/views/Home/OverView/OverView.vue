<template>
  <div class="over-container">
    <Title title="首页" />
    <div class="inner">
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="state.user">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  总用户
                </div>
              </template>
            </el-statistic>
            <!-- <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
          </div>
        </div> -->
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="state.goods">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  商品
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="state.order" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  订单
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
    <OverallCharts />
  </div>
</template>

<script lang="ts" setup>
import { Warning } from "@element-plus/icons-vue";
import Title from "../../../components/Title.vue";
import OverallCharts from "./OverallCharts.vue";
import { reactive } from "vue";
import { fetchOverViewData } from "../../../api/overview";

const state = reactive({ user: 0, goods: 0, order: 0 });

(async () => {
  const overview = (await fetchOverViewData()) as unknown as {
    user: number;
    goods: number;
    order: number;
  };

  state.goods = overview.goods;
  state.order = overview.order;
  state.user = overview.user;
})();
</script>

<style scoped lang="less">
.over-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .inner {
    width: 100%;
    margin-bottom: 20px;
  }
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
  display: flex;
  justify-content: center;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
