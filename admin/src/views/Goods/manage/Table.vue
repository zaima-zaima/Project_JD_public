<template>
  <div class="table-container">
    <el-table
      :data="props.data"
      style="width: 100%"
      v-loading="props.loading"
      v-if="props.data.length !== 0 || props.loading"
    >
      <el-table-column fixed prop="brand" label="品牌" width="100" />
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column prop="no" label="产品编号" width="120" />
      <el-table-column prop="region" label="来源" v-slot="scope" width="120">
        {{ scope.row.region === "internal" ? "国产" : "进口" }}
      </el-table-column>

      <el-table-column prop="ingradient" label="材料" width="120" />
      <el-table-column prop="sold" label="已售" width="120" />
      <el-table-column prop="store" label="库存" width="120" />
      <el-table-column prop="weight" label="重量(kg)" width="120" />
      <el-table-column
        prop="approperate"
        v-slot="scope"
        label="适用人群"
        width="120"
      >
        {{
          scope.row.approperate === "normal"
            ? "通用"
            : scope.row.approperate === "baby"
            ? "婴儿"
            : scope.row.approperate === "child"
            ? "儿童"
            : "成人"
        }}
      </el-table-column>

      <el-table-column
        prop="back7day"
        v-slot="scope"
        label="7天无理由退货"
        width="120"
      >
        {{ scope.row.back7day ? "是" : "否" }}
      </el-table-column>

      <el-table-column
        prop="baitiaoPay"
        v-slot="scope"
        label="支持白条支付"
        width="120"
      >
        {{ scope.row.baitiaoPay ? "是" : "否" }}
      </el-table-column>

      <el-table-column prop="deliver" v-slot="scope" label="免运费" width="120">
        {{ scope.row.deliver ? "是" : "否" }}
      </el-table-column>

      <el-table-column
        prop="specification"
        v-slot="scope"
        label="规格"
        width="120"
      >
        {{
          scope.row.specification === "ge"
            ? "个"
            : scope.row.specification === "ping"
            ? "瓶"
            : scope.row.specification === "zhang"
            ? "张"
            : "片"
        }}
      </el-table-column>

      <el-table-column
        prop="publisher"
        v-slot="scope"
        label="发布者"
        width="120"
      >
        {{ scope.row.publisher.username }}
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            @click="goEdit(scope.row)"
            :icon="Edit"
            circle
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="destoryGoods(scope.row)"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <el-empty description="无数据" v-else />
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="props.total"
        :current="+(route.query.page as any) || 1"
        :page-size="+(route.query.limit as any) || 10"
        hide-on-single-page
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Goods } from "../../../types/Goods";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();

interface PropsType {
  data: Goods[];
  total: number;
  loading: boolean;
}

const props = defineProps<PropsType>();

const emits = defineEmits(["remove"]);

function changePage(newPage: number) {
  router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });
}

function goEdit(row: Goods) {
  router.push({
    name: "Edit",
    params: {
      id: row.id,
    },
  });
}

function destoryGoods(goods: Goods) {
  ElMessageBox.confirm(`确认要删除 ${goods.name}吗？`, "确认删除", {
    cancelButtonText: "取消",
    confirmButtonText: "确认删除",
    callback: (action, instance) => {
      if (action === "confirm") {
        emits("remove", goods);
      }
    },
  });
}

function handleClick() {}
</script>

<style scoped lang="less">
.table-container {
  width: 100%;

  .page {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 40px;
  }
}
</style>
