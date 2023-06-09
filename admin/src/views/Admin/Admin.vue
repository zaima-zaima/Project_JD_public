<template>
  <div class="admin-container">
    <Title title="管理员管理" />
    <div class="toolsBar">
      <ToolsBar
        @onUpdateAdmin="onUpdateAdmin"
        @reset="onReset"
        :key="state.random"
        :total="state.total"
        @search="onSearch"
      />
    </div>
    <div class="tip">提示：此处只展示隶属于该账号下的管理员</div>
    <div class="table" v-if="state.data.length !== 0 || state.loading">
      <Table
        :admin="state.data"
        :total="state.total"
        :loading="state.loading"
      />
    </div>
    <el-empty description="无数据" v-else />
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { fetchAdminByKeyword, fetchAllAdminByFilter } from "../../api/admin";
import Title from "../../components/Title.vue";
import { Admin } from "../../types/Admin";
import ToolsBar from "./ToolsBar.vue";
import Table from "./Table.vue";
import delay from "../../utils/delay";
import { useRoute } from "vue-router";
import { ResponseWithCount } from "../../types/response";
import router from "../../route/router";

const state = reactive({
  data: [] as Admin[],
  originData: [] as Admin[],
  random: "",
  total: 0,
  loading: false,
  filter: {} as Object,
});

const route = useRoute();

const store = useStore();
watchEffect(async () => {
  state.loading = true;
  if (store.state.user) {
    const resp = (await fetchAllAdminByFilter(
      {
        ...state.filter,
        senior: store.state.user.id,
      },
      +(route.query.page as string) || 1,
      +(route.query.limit as string) || 10
    )) as unknown as ResponseWithCount<Admin>;

    state.data = resp.rows;
    state.total = resp.count;

    state.originData = state.data;
  }
  state.loading = false;
});

async function onUpdateAdmin(filter: Object) {
  state.loading = true;
  state.filter = filter;
  const resp = (await fetchAllAdminByFilter(
    {
      ...filter,
    },
    +(route.query.page as string) || 1,
    +(route.query.limit as string) || 10
  )) as unknown as ResponseWithCount<Admin>;

  state.data = resp.rows;
  state.total = resp.count;
  state.loading = false;
}

async function onReset() {
  state.random = String(Math.random() + Date.now());
  state.data = state.originData;
  state.filter = {};

  if (route.query.page && +route.query.page === 1) {
    return;
  }

  router.push({
    query: {
      ...route.query,
      page: 1,
    },
  });
}

async function onSearch(keyword: string) {
  if (!keyword) {
    state.data = state.originData;
    return;
  }

  state.loading = true;

  state.data = (await delay(fetchAdminByKeyword, keyword)) as Admin[];

  state.loading = false;
}
</script>

<style scoped lang="less">
.admin-container {
  width: 100%;

  .toolsBar {
    width: 100%;
    height: 40px;
  }
}

.tip {
  font-size: 14px;
  padding: 0px 10px;
}

.table {
  width: fit-content;
  padding: 10px;
}
</style>
