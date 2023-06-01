<template>
  <div class="tools-bar-container">
    <div class="left">
      <div class="total center">总人数：{{ props.total }}</div>
      <div
        class="leader"
        v-if="store.state.user && store.state.user.authLevel === 0"
      >
        <el-checkbox
          :disabled="state.status !== ''"
          :checked="state.checked"
          v-model="state.leader"
          @change="changeLeader"
          label="leader"
          size="small"
        />
      </div>
      <div
        class="department"
        v-if="store.state.user && store.state.user.authLevel === 0"
      >
        <el-select
          v-model="state.deparment"
          class="m-2"
          placeholder="选择部门"
          size="small"
          @change="selectedDepartment"
          :disabled="state.departmentDisable"
        >
          <el-option
            v-for="item in state.data.deparment"
            :key="item.id"
            :label="item.name"
            :value="item.id as string"
          />
        </el-select>
      </div>
      <div
        class="currentLeader"
        v-if="store.state.user && store.state.user.authLevel === 0"
      >
        <el-select
          v-model="state.currentLeader"
          class="m-2"
          placeholder="选择leader"
          size="small"
          @change="selectedLeader"
        >
          <el-option
            v-for="item in state.data.leaders"
            :key="item.id"
            :label="item.username"
            :value="item.id as string"
          />
        </el-select>
      </div>
      <div class="status">
        <el-select
          v-model="state.status"
          class="m-2"
          placeholder="选择状态"
          size="small"
          @change="selectedStatus"
        >
          <el-option
            v-for="item in state.data.status"
            :key="item.value"
            :label="item.label"
            :value="item.value as string"
          />
        </el-select>
      </div>
      <div class="reset">
        <el-button
          type="warning"
          size="small"
          :disabled="
            state.deparment === '' &&
            state.leader === undefined &&
            state.status === ''
          "
          @click="onReset"
          round
          >重置</el-button
        >
      </div>
    </div>
    <div class="right">
      <Search placeholder="请输入管理员昵称" @input="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { fetchAdminById, fetchAllAdminByFilter } from "../../api/admin";
import { fetchAllDeparment } from "../../api/department";
import Search from "../../components/Search.vue";
import { Admin } from "../../types/Admin";
import { Department } from "../../types/Department";
import { useStore } from "vuex";

interface PropsType {
  total: number;
}

const props = defineProps<PropsType>();

const store = useStore();

const state = reactive({
  leader: undefined as undefined | boolean,
  checked: false,
  deparment: "",
  departmentDisable: false,
  status: "",
  data: {
    deparment: [] as Department[],
    status: [
      { label: "等待批准", value: "pending" },
      { label: "已拒绝", value: "rejected" },
      { label: "已同意", value: "approved" },
    ],
    leaders: [] as Admin[],
  },
  currentLeader: "",
  currentAdmin: {} as Admin,
});

(async function () {
  state.data.deparment = (await fetchAllDeparment()) as unknown as Department[];
  state.data.leaders = (await fetchAllAdminByFilter({
    leader: true,
  })) as unknown as Admin[];
})();

const emits = defineEmits(["search", "onUpdateAdmin", "reset"]);

function search(keyWords: string) {
  emits("search", keyWords);
}

function selectedDepartment() {
  const tar = { department: state.deparment } as any;
  if (state.leader !== undefined) {
    tar.leader = state.leader;
  }

  if (state.status !== "") {
    tar.status = state.status;
  }

  if (state.currentLeader !== "") {
    tar.senior = state.currentLeader;
  }

  emits("onUpdateAdmin", tar);
}

function changeLeader() {
  state.checked = state.leader as boolean;

  const tar = {
    department: state.deparment,
    leader: state.leader,
  } as any;

  if (!state.deparment) {
    emits("onUpdateAdmin", { leader: state.leader });
    return;
  }

  if (state.currentLeader !== "") {
    tar.senior = state.currentLeader;
  }

  emits("onUpdateAdmin", tar);
}

async function selectedStatus() {
  state.leader = undefined;
  const tar = { status: state.status } as any;
  if (state.deparment !== "") {
    tar.department = state.deparment;
  }

  if (state.currentLeader !== "") {
    tar.senior = state.currentLeader;
  } else if (store.state.user && store.state.user.authLevel !== 0) {
    const admin = (await fetchAdminById(
      store.state.user.id
    )) as unknown as Admin;

    tar.senior = store.state.user.id;
    tar.department = admin.department;
  }

  emits("onUpdateAdmin", tar);
}

async function selectedLeader() {
  state.departmentDisable = true;
  const tar = { senior: state.currentLeader } as any;
  const admin = (await fetchAdminById(state.currentLeader)) as unknown as Admin;

  state.deparment = admin.department;
  if (state.status !== "") {
    tar.status = state.status;
  }

  if (state.deparment !== "") {
    tar.department = state.deparment;
  }

  if (state.leader) {
    tar.leader = state.leader;
  }

  emits("onUpdateAdmin", tar);
}

function onReset() {
  state.deparment = "";
  state.leader = undefined;
  state.checked = false;
  state.status = "";
  emits("reset");
}
</script>

<style scoped lang="less">
.tools-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
  justify-content: space-between;
  .left {
    display: flex;
    .total {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin: 0px 10px;
    }
    .leader {
      margin-left: 20px;
    }
    .department {
      margin: 0px 20px;
    }
    .reset {
      margin-left: 20px;
    }
  }
  .right {
    width: 300px;
  }
}
</style>
