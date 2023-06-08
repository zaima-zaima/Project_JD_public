<template>
  <div class="table-container">
    <el-table :data="props.admin" v-loading="props.loading">
      <el-table-column fixed prop="username" label="用户名" width="150" />

      <el-table-column
        prop="department"
        label="部门"
        width="120"
        v-slot="scope"
      >
        {{ scope.row.department && scope.row.department.name }}
      </el-table-column>
      <el-table-column prop="leader" label="leader" width="100" v-slot="scope">
        {{ scope.row.leader ? "是" : "否" }}
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" v-slot="scope">
        {{
          scope.row.status === "pending"
            ? "等待批准"
            : scope.row.status === "rejected"
            ? "已拒绝"
            : "正常"
        }}
      </el-table-column>

      <el-table-column prop="senior" label="上级" width="80" v-slot="scope">
        {{ scope.row.senior && scope.row.senior.username }}
      </el-table-column>
      <el-table-column fixed="right" label="批准" width="120">
        <template v-slot="scope">
          <el-select
            v-if="scope.row.status !== 'approved'"
            v-model="state.currentStatus[scope.row.id as string]"
            class="m-2"
            placeholder="操作"
            size="large"
            @change="changeStatus(scope.row)"
          >
            <el-option label="批准" value="approved" />
            <el-option label="拒绝" value="rejected" />
          </el-select>
          <span v-else>----</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pager">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="props.total"
        :page-size="+(route.query.limit as string)"
        :current-page="+(route.query.page as string)"
        :hide-on-single-page="true"
        @current-change="changePage"
      />
    </div>

    <el-dialog
      v-model="state.modalShow"
      :show-close="false"
      title="提示"
      width="30%"
    >
      <div>
        确认要
        <span class="baseColor">{{
          state.currentStatus[state.currentUser.id as string] === "approved"
            ? "同意"
            : "拒绝"
        }}</span
        >管理员<span class="baseColor">{{ state.currentUser.username }}</span>
        的注册请求吗？
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.modalShow = false">取消</el-button>
          <el-button
            type="primary"
            @click="toggleStatus"
            :loading="state.loading"
          >
            {{ state.loading ? "请稍等" : "确认" }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateAdmin } from "../../api/admin";
import { Admin } from "../../types/Admin";

interface PropsType {
  admin: Admin[];
  total: number;
  loading: boolean;
}

const props = defineProps<PropsType>();
const state = reactive({
  currentStatus: {} as any,
  currentUser: {} as Admin,
  modalShow: false,
  loading: false,
});

const router = useRouter();
const route = useRoute();

function changeStatus(admin: Admin) {
  state.modalShow = true;
  state.currentUser = admin;
  console.log(admin);
}

async function toggleStatus() {
  state.loading = true;
  const resp = (await updateAdmin(
    state.currentUser.id as string,
    { status: state.currentStatus[state.currentUser.id as string] } as any
  )) as any;

  state.loading = false;

  if (!resp.code || resp.code !== 0) {
    router.go(0);
  }
}

function changePage(page: number) {
  if (+(route.query.page as string) === page) {
    return;
  }

  router.push({
    query: {
      ...route.query,
      page,
    },
  });
}
</script>

<style scoped lang="less">
.baseColor {
  color: @baseColor;
}

.table-container {
  width: fit-content;
}

.pager {
  width: 100%;
  height: 60px;

  display: Flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
