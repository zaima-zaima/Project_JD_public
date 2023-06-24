<template>
  <div class="tools-container">
    <div class="tools-inner">
      <div class="left">
        <div class="pending">
          <el-badge
            :value="state.data.length"
            @click="handlerPannelShow"
            class="item"
          >
            <el-button>待处理</el-button>
          </el-badge>
          <div class="pending-pannel" v-if="state.pannelShow">
            <Table
              :data="state.data"
              @toggle-chage="toggleChage"
              @close="state.pannelShow = false"
              :loading="state.tableLoading"
            />
          </div>
        </div>
      </div>
      <div
        class="right"
        v-if="store.state.user && String(store.state.user.authLevel) === '0'"
      >
        <el-button type="primary" @click="openModel">添加部门</el-button>
      </div>
    </div>
    <el-dialog v-model="state.model" title="添加部门">
      <el-form :model="state.form">
        <el-form-item label="部门名" :label-width="120">
          <el-input
            v-model="state.form.name"
            autocomplete="off"
            @input="onInput"
          />
          <div class="error" v-if="state.error">{{ state.error }}</div>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.model = false">取消</el-button>
          <el-button
            type="primary"
            @click="addDepartment"
            :loading="state.loading"
          >
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { updateAdmin } from "../../api/admin";
import { getTransfer, updateTransfer } from "../../api/transfer";
import { ResponseWithCount } from "../../types/response";
import { Transfer } from "../../types/Transfer";
import Table from "./components/Table.vue";

const state = reactive({
  model: false,
  form: {
    name: "",
  },
  error: "",
  loading: false,
  page: 1,
  limit: 10,
  count: 0,
  data: [] as Transfer[],
  pannelShow: false,
  tableLoading: false,
});

const emits = defineEmits(["addDepartment"]);

const store = useStore();

watchEffect(async () => {
  if (store.state.user) {
    await fetchTransfer();
  }
});

async function fetchTransfer() {
  const transfer = (await getTransfer(state.page, state.limit, {
    leader: store.state.user.id,
    status: "pending",
  })) as unknown as ResponseWithCount<Transfer>;

  state.count = transfer.count;
  state.data = transfer.rows as Transfer[];
}

async function openModel() {
  state.model = true;
}

function addDepartment() {
  if (!state.form.name) {
    state.error = "名称不能为空";
    return;
  }

  if (state.form.name.length < 2 || state.form.name.length > 10) {
    state.error = "名称长度范围为2-10";
    return;
  }

  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

  if (!reg.test(state.form.name)) {
    state.error =
      "错误！该值可以取下划线，字母，数字以及中文（不能以下划线开头）";
    return;
  }

  state.loading = true;
  emits("addDepartment", state.form.name, () => {
    state.loading = false;
    state.model = false;
    state.form.name = "";
  });
}

function onInput() {
  state.error = "";
}

async function toggleChage(status: string, data: Transfer) {
  state.loading = true;
  if (status === "approve") {
    const resp = await updateAdmin(
      data.target.id as string,
      {
        department: data.to.id as string,
        senior: data.leader.id as any,
        transfer: null,
      } as any
    );
    if (resp) {
      await updateTransfer(data.id, {
        status,
        target: data.target.id,
        leader: data.leader.id,
        form: data.from.id,
        to: data.to.id,
      } as any);
    }
  } else {
    await updateTransfer(data.id, {
      status,
    } as any);
  }

  state.loading = false;

  state.data = state.data.filter((ele) => ele.id !== data.id);
}

async function handlerPannelShow() {
  state.tableLoading = true;
  state.pannelShow = true;
  await fetchTransfer();
  state.tableLoading = false;
}
</script>

<style scoped lang="less">
.tools-container {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  .tools-inner {
    width: 1200px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    .left {
      .pending {
        position: relative;

        .pending-pannel {
          width: 1200px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          height: 50px;
          background-color: #fff;
          z-index: 5;
          position: absolute;
          margin-top: 5px;
        }
      }
    }
  }
}

.error {
  color: red;
}
</style>
