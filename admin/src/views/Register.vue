<template>
  <div class="register-container">
    <Banner text="管理员注册" />
    <div class="register-body">
      <el-form
        :model="state.form"
        :rules="rulers"
        label-width="120px"
        ref="form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="state.form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="state.form.password" type="password" />
        </el-form-item>
        <el-form-item label="选择你的部门" prop="deparment">
          <el-select
            v-model="state.form.department"
            placeholder="请选择你的部门"
            @change="fetchAdmin"
          >
            <el-option
              v-for="item in state.departments"
              :label="item.name"
              :value="item.id as string"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择你的leader" prop="senior">
          <el-select
            v-if="state.leaders.length !== 0"
            v-model="state.form.senior"
            placeholder="如不选择，默认为root"
          >
            <el-option
              v-for="item in state.leaders"
              :label="item.username"
              :value="item.id"
            />
          </el-select>
          <span v-else
            >当前部门暂没有任何leader，你可以提交注册信息，后续网站超级管理员将会进行相关操作</span
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="goRegister"
            :loading="state.loading"
            >{{ state.loading ? "注册中" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "../components/Banner.vue";
import { reactive, watchEffect, ref } from "vue";
import { Department } from "../types/Department";
import { fetchAllDeparment } from "../api/department";
import { adminRegistor, fetchAllAdminByFilter } from "../api/admin";
import { useRouter } from "vue-router";
import { Admin } from "../types/Admin";
import { ElMessageBox } from "element-plus";
import rulers from "../utils/validators/registerRuler";

const state = reactive({
  form: {
    username: "",
    password: "",
    department: "",
    senior: "",
  },
  departments: [] as Department[],
  leaders: [] as any[],
  loading: false,
});

watchEffect(async () => {
  state.departments = (await fetchAllDeparment()) as unknown as Department[];
  state.form.department = state.departments[0].id as string;
  fetchAdmin();
});

const router = useRouter();

async function fetchAdmin() {
  state.leaders = (await fetchAllAdminByFilter({
    department: state.form.department,
    leader: true,
  })) as unknown as any[];
  state.form.senior = "";
}

const form = ref();

async function goRegister() {
  console.log("fsf");

  form.value.validate(async (valid: any) => {
    if (valid) {
      state.loading = true;

      try {
        const resp = (await adminRegistor(state.form as Admin)) as any;
        if (!resp.code && !resp.msg) {
          router.push({
            name: "RegisterSuccess",
          });
        } else {
          ElMessageBox.alert(resp.msg);

          state.loading = false;
        }
      } catch {
        state.loading = false;
      }
    } else {
      return false;
    }
  });
}
</script>

<style scoped lang="less">
.register-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .register-body {
    width: 900px;
    margin-top: 100px;
  }
  .error {
    color: red;
  }
}
</style>
