<template>
  <div class="table-container">
    <el-table
      :data="props.data"
      style="width: 100%"
      v-loading="props.loading"
      v-if="props.data.length !== 0 || props.loading"
    >
      <el-table-column
        fixed
        prop="target"
        label="人员"
        v-slot="scope"
        width="150"
      >
        {{ scope.row.target.username }}
      </el-table-column>
      <el-table-column prop="from" label="原部门" v-slot="scope" width="120">
        {{ scope.row.from.name }}
      </el-table-column>
      <el-table-column prop="to" label="转入到" v-slot="scope" width="120">
        {{ scope.row.to.name }}
      </el-table-column>
      <el-table-column prop="leader" label="leader" v-slot="scope" width="120">
        {{ scope.row.leader.username }}
      </el-table-column>
      <el-table-column
        prop="actionFrom"
        label="提交申请人"
        v-slot="scope"
        width="600"
      >
        {{ scope.row.actionFrom.username }}
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template v-slot="scope">
          <el-select
            v-model="state.status[scope.row.id]"
            class="m-2"
            placeholder="选择"
            size="large"
            @change="toggleChange(scope.row)"
          >
            <el-option label="同意" value="approve" />
            <el-option label="拒绝" value="reject" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-empty description="暂无待处理的信息" v-else :image-size="80" />
    <div class="footer">
      <el-button type="danger" @click="closeHandel">关闭</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";

import { Transfer } from "../../../types/Transfer";

interface PropsType {
  data: Transfer[];
  loading: boolean;
}

const props = defineProps<PropsType>();

const state = reactive({
  status: {} as any,
});

watchEffect(() => {
  props.data.forEach((item) => {
    state.status[item.id] = "";
  });
});

const emits = defineEmits(["toggleChage", "close"]);

function toggleChange(data: Transfer) {
  emits("toggleChage", state.status[data.id], data);
}

function closeHandel() {
  emits("close");
}
</script>

<style scoped lang="less">
.table-container {
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
