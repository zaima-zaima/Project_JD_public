<template>
  <div class="admin-container">
    <div class="title">
      <span>本部门:{{ props.data.length }}人</span>
      <span class="leader">
        <Icon :type="StyleType.user" :size="16" /> leader:
        {{ state.leader.length }}人</span
      >
      <div
        class="tip"
        v-if="props.data.length !== 0 && state.leader.length === 0"
      >
        提示：目前该部门没有任何leader，这将导致新管理员如果注册到该部门时无法指定leader，建议至少设置一个leader
      </div>
    </div>
    <div class="content" v-if="props.data.length !== 0">
      <div class="admin-item" v-for="item in props.data">
        <div class="admin-item-content">
          <div class="name">
            <Icon :type="StyleType.user" v-if="item.leader" :size="16" />
            {{ item.username }}
          </div>
        </div>
        <div class="set">
          <el-button
            type="primary"
            :disabled="Boolean(item.transfer)"
            size="small"
            @click="showTransfer(item)"
          >
            {{ item.transfer ? "交接中" : "转移" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="state.loading[item.id as string]"
            v-if="!item.leader"
            @click="showModel(item)"
            >{{
              state.loading[item.id as string] ? "等待中..." : "设为leader"
            }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <Icon :type="StyleType.user" :size="40" />
      目前没有任何人员
    </div>
    <el-dialog v-model="state.model" title="提示" width="30%" center>
      <p>
        确认要将
        <span class="base">{{ state.current.username }}</span>
        设为部门管理员吗？
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.model = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmHandler"
            :loading="state.comfing"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="state.transfer.show"
      title="转移"
      width="30%"
      @close="closeHandler"
      center
    >
      <p>部门转移</p>
      <el-form
        :model="state.transfer.form"
        :rules="rulers"
        ref="form"
        label-width="120px"
      >
        <el-form-item label="转移人员">
          <el-input v-model="state.form.name" disabled />
        </el-form-item>
        <el-form-item label="转移到" prop="to">
          <el-select
            v-model="state.transfer.form.to"
            placeholder="请选择"
            @change="fetchLeader"
          >
            <el-option
              :label="item.name"
              :value="item.id as string"
              v-for="item in state.form.department"
            />
          </el-select>
          <div class="tip">
            <el-popover
              v-if="state.transfer.form.to && state.form.leader.length === 0"
              placement="top-start"
              title=""
              :width="200"
              trigger="hover"
              content="因该部门暂没有leader，系统会自动将该账号设置超级管理员为leader"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </el-form-item>

        <el-form-item label="leader" v-if="state.form.leader.length !== 0">
          <el-select
            v-model="state.transfer.form.leader"
            placeholder="如不选择，则默认为root"
          >
            <el-option
              :label="item.username"
              :value="item.id as string"
              v-for="item in state.form.leader"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="下级转移"
          v-if="state.current.leader"
          prop="seniorFromDepartment"
        >
          <el-select
            v-model="state.transfer.form.seniorFromDepartment"
            placeholder="请选择"
          >
            <el-option
              :label="item.username"
              :value="item.id as string"
              v-for="item in state.form.adminTransfer"
            />
          </el-select>
          <div class="tip">
            <el-popover
              placement="top-start"
              title=""
              :width="200"
              trigger="hover"
              content="因该管理员为该部门的leader，所以在该管理员调动前需要指派该leader下的管理员的上级，当该leader完成交接事宜后，自动将该leader下的管理员设置到指定的leader下"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="state.form.loading"
            @click="submit"
            >发起申请</el-button
          >
          <el-button @click="state.transfer.show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import { fetchAllAdminByFilter } from "../../api/admin";
import { fetchAllDeparment } from "../../api/department";
import { transferCreator } from "../../api/transfer";
import Icon from "../../components/Icon.vue";
import { Admin } from "../../types/Admin";
import { Department } from "../../types/Department";
import { StyleType } from "../../types/enum";

import { ElMessageBox } from "element-plus";

import { QuestionFilled } from "@element-plus/icons-vue";

import type { Action } from "element-plus";

import rulers from "../../utils/validators/TransferRuler";
import { Transfer } from "../../types/Transfer";

interface PropsType {
  data: Admin[];
}

const state = reactive({
  leader: [] as Admin[],
  loading: {} as any,
  model: false,
  current: {} as Admin,
  transfer: {
    form: {
      to: "",
      leader: "",
      seniorFromDepartment: "",
    } as any,
    show: false,
  },
  form: {
    name: "",
    department: [] as Department[],
    leader: [] as Admin[],
    loading: false,
    adminTransfer: [] as Admin[],
  },
  comfing: false,
});

const props = defineProps<PropsType>();

const emits = defineEmits(["setAdmin", "transfer"]);

const store = useStore();

watchEffect(() => {
  state.leader = props.data.filter((item) => item.leader);
});

function showModel(item: Admin) {
  state.model = true;
  state.current = item;
}

function confirmHandler() {
  state.model = false;
  state.loading[state.current.id as string] = true;
  state.comfing = true;

  emits("setAdmin", state.current, () => {
    state.loading[state.current.id as string] = false;
    state.comfing = false;
    state.current = {} as Admin;
  });
}

async function showTransfer(item: Admin) {
  if (item.transfer) {
    return;
  }

  state.transfer.show = true;
  state.form.name = item.username;
  state.current = item;
  const department = (await fetchAllDeparment()) as unknown as Department[];
  state.form.department = department.filter(
    (depart) => depart.id !== (item.department as any as Department).id
  );

  if (state.current.leader) {
    const resp = (await fetchAllAdminByFilter({
      department: (state.current.department as any as Department).id,
      leader: true,
    })) as unknown as Admin[];

    state.form.adminTransfer = resp.filter(
      (ele) => ele.id !== state.current.id
    );
  }

  state.transfer.form.actionFrom = store.state.user.id;
  state.transfer.form.from = (item.department as any as Department)
    .id as string;
  state.transfer.form.target = item.id as string;
}

async function fetchLeader() {
  console.log(state.transfer.form.to);

  const leader = (await fetchAllAdminByFilter({
    department: state.transfer.form.to,
    leader: true,
  })) as unknown as Admin[];

  state.form.leader = leader;
}

const form = ref();

async function submit() {
  form.value.validate(async (valid: any) => {
    if (valid) {
      state.form.loading = true;
      const data = (await transferCreator(state.transfer.form)) as any;
      if (data.code && data.code !== 0) {
        return;
      }

      emits("transfer", data.id);
      ElMessageBox.alert("等待相关部门人员审核中", "提交成功", {
        confirmButtonText: "确定",
        callback: (action: Action) => {
          state.transfer.show = false;
        },
      });
    } else {
      return false;
    }
  });
}

function closeHandler() {
  state.current = {} as Admin;
  state.loading = false;
  state.transfer.form.to = "";
  state.transfer.form.leader = "";
  state.transfer.form.seniorTransfer = "";
  state.transfer.show = false;
  state.form.leader = [];
  state.form.department = [];
}
</script>

<style scoped lang="less">
.admin-container {
  width: 100%;
  background-color: #e6e5e5;
  .title {
    box-sizing: border-box;
    padding: 5px 10px;
    .leader {
      margin: 0px 20px;
    }
    .tip {
      font-size: 14px;
      margin: 10px 0px;
    }
  }
  .content {
    width: 100%;
    max-height: 700px;
    overflow-y: scroll;
    .admin-item {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      box-sizing: border-box;
      padding: 5px 10px;
      &:hover {
        background-color: #f2eded;
      }
    }
  }

  .empty {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    flex-direction: column;
    color: #ccc;
  }
}

.base {
  color: @baseColor;
}

.pointer {
  cursor: pointer;
  margin-left: 10px;
}

.tip {
  margin-left: 20px;
  cursor: pointer;
}
</style>
