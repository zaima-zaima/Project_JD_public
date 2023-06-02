<template>
  <div class="department-container">
    <Title title="部门管理" />
    <div class="toolBar">
      <ToolBar @addDepartment="addDepartment" />
    </div>
    <div class="content-box" v-loading="state.loading">
      <div class="content">
        <div
          class="menu"
          v-if="store.state.user && String(store.state.user.authLevel) === '0'"
        >
          <Menu :data="state.data" @fetchAdmin="fetchAdmin" />
        </div>
        <div class="person">
          <Admin
            :data="state.admin"
            @setAdmin="setAdmin"
            @transfer="transferHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { departmentCreator, fetchAllDeparment } from "../../api/department";
import Title from "../../components/Title.vue";
import { Department } from "../../types/Department";
import Menu from "./Menu.vue";
import Admin from "./Admin.vue";
import { Admin as AdminType } from "../../types/Admin";
import {
  fetchAdminById,
  fetchAllAdminByFilter,
  updateAdmin,
} from "../../api/admin";
import ToolBar from "./ToolBar.vue";
import { dataTool } from "echarts";
import { getTransferById } from "../../api/transfer";
import { Transfer } from "../../types/Transfer";
import { useStore } from "vuex";

const state = reactive({
  data: [] as Department[],
  admin: [] as AdminType[],
  loading: false,
});

const store = useStore();

watchEffect(async () => {
  state.loading = true;

  if (store.state.user && store.state.user.authLevel === 0) {
    // 当管理员事root用户
    state.data = (await fetchAllDeparment()) as unknown as Department[];

    state.admin = (await fetchAllAdminByFilter({
      department: state.data[0].id as string,
    })) as unknown as AdminType[];
  } else if (store.state.user && store.state.user.authLevel !== 0) {
    // 当管理员不是root用户

    const admin = (await fetchAdminById(
      store.state.user.id
    )) as unknown as AdminType;

    state.admin = (await fetchAllAdminByFilter({
      department: admin.department,
    })) as unknown as AdminType[];
  }

  state.loading = false;

  state.admin.sort((a: AdminType, b: AdminType) => {
    if (a.leader) {
      return -1;
    }
    return 1;
  });
});

async function fetchAdmin(item: Department) {
  const admin = (await fetchAllAdminByFilter({
    department: item.id,
  })) as unknown as AdminType[];

  state.admin = admin.sort((a, b) => {
    if (a.leader) {
      return -1;
    }
    return 1;
  });
}

async function setAdmin(item: AdminType, callback: Function) {
  const resp = await updateAdmin(item.id as string, { leader: true } as any);
  state.admin = state.admin.map((admin) => {
    if (item.id === admin.id) {
      admin.leader = true;
    }
    return admin;
  });

  state.admin.sort((a: AdminType, b: AdminType) => {
    if (a.leader) {
      return -1;
    }
    return 1;
  });
  callback();
}

async function addDepartment(name: string, callback: Function) {
  const data = (await departmentCreator(name)) as unknown as Department;
  callback();
  state.data.push(data);
}

async function transferHandler(id: string) {
  const transfer = (await getTransferById(id)) as any;

  console.log("transfer:", transfer);

  if (transfer.code && transfer.code !== 0) {
    return;
  }

  state.admin = state.admin.map((ele) => {
    console.log();

    if (ele.id === transfer.target) {
      ele.transfer = "true";
    }

    return ele;
  });
}
</script>

<style scoped lang="less">
.department-container {
  width: 100%;
  .content-box {
    width: 100%;
    display: flex;
    justify-content: center;
    .content {
      width: 1200px;
      display: flex;
      height: 500px;
      justify-content: center;
      .menu {
        width: 300px;
        height: 100%;
      }
      .person {
        flex: 1 0 auto;
        margin-left: 20px;
        height: 100%;
      }
    }
  }
}
</style>
