<template>
  <div class="role-container">
    <Title title="角色管理" />
    <div class="content">
      <div class="toolsBar">
        <ToolBar :total="state.total" @addRoler="addRoler" />
      </div>
      <div class="table">
        <el-table
          :data="state.data"
          style="width: 70%"
          v-loading="state.pageLoading"
        >
          <!-- <el-table-column prop="id" label="角色唯一标识" width="350" /> -->
          <el-table-column prop="name" label="角色名" width="120" />
          <el-table-column prop="total" label="当前角色总人数" width="150" />
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
                @click="removeRoler(scope.row.id)"
                v-if="isDelete(scope.row)"
                :icon="Delete"
                circle
              />
            </template>
          </el-table-column>
        </el-table>
        <Diolog
          :show="state.show"
          :title="state.title"
          :loading="state.loading"
          @submitRoler="sumbitRoler"
          @close="init"
          :value="state.value"
          @updateRoler="updateRoler"
        />
      </div>

      <el-dialog title="确认删除" v-model="state.deleteTip">
        确认要删除此角色吗？
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.deleteTip = false">取消</el-button>
            <el-button
              type="primary"
              :loading="state.deleteLoading"
              @click="comfirmDelete"
            >
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog title="错误" v-model="state.error">
        {{ state.errorMsg }}
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToolBar from "./ToolBar.vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { computed, reactive } from "vue";
import {
  getRolers,
  createRoler,
  rolerUpdator,
  deleteRoler,
} from "../../api/roler";
import { ResponseWithCount } from "../../types/response";
import Diolog from "./Diolog.vue";
import Title from "../../components/Title.vue";
import { Role } from "../../types/User";
import roler from "../../../../server/configure/roler";

const state = reactive({
  data: [] as any,
  total: 0,
  show: false,
  loading: false,
  title: "",
  pageLoading: false,
  error: false,
  errorMsg: "",
  value: null as null | string,
  currentId: "",
  deleteTip: false,
  deleteLoading: false,
});

(async function () {
  state.pageLoading = true;
  const data = (await getRolers()) as unknown as ResponseWithCount<Role>;
  state.pageLoading = false;
  state.total = data.count;
  state.data = data.rows;
})();

function isDelete(item: any) {
  if (item.id === roler.business || item.id === roler.user) {
    return false;
  }

  if (item.total === 0) {
    return true;
  }

  return false;
}

function addRoler() {
  state.show = true;
  state.title = "添加角色";
}

async function sumbitRoler(name: string) {
  state.loading = true;
  const resp = (await createRoler(name)) as any;

  state.loading = false;
  state.show = false;

  if (resp.code && resp.code !== 0) {
    state.error = true;
    state.errorMsg = resp.msg;
    return;
  }

  state.data.unshift(resp);
  state.total++;
}

async function updateRoler(name: string) {
  const data = (await rolerUpdator(state.currentId, name)) as any;

  if (data.code && data.code !== 0) {
    // 更新出错

    state.show = false;
    state.error = true;
    state.errorMsg = data.msg;

    return;
  }

  state.data = state.data.map((ele: any) => {
    if (ele.id === state.currentId) {
      ele.name = name;
    }

    return ele;
  });
  state.show = false;
  state.value = null;
  state.currentId = "";
}

function goEdit(item: any) {
  state.show = true;
  state.title = "修改角色";

  state.currentId = item.id;

  state.value = item.name;
}

function init() {
  state.show = false;
  state.currentId = "";
  state.value = null;
  console.log(state.value);
}

function removeRoler(id: string) {
  state.deleteTip = true;
  state.currentId = id;
}

async function comfirmDelete() {
  state.deleteLoading = true;
  const resp = (await deleteRoler(state.currentId)) as any;
  if ((resp.code && resp.code !== 0) || !resp) {
    state.deleteTip = false;
    state.error = true;
    state.errorMsg = "删除失败，请重试";
    state.deleteLoading = false;
  }

  state.data = state.data.filter((ele: any) => ele.id !== state.currentId);
  state.deleteTip = false;
  state.deleteLoading = false;
}
</script>

<style scoped lang="less">
.role-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 0 auto;
    width: 100%;

    .toolsBar {
      width: 100%;
      height: 50px;
    }
  }
}
</style>
