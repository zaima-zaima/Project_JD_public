<template>
  <div class="user-container">
    <Title title="用户管理">
      <template #default>
        <User />
      </template>
    </Title>
    <div class="content">
      <div class="tools">
        <ToolBar
          :total="state.total"
          @input="handleInput"
          @fetch-user-by-filter="fetchUserByFilter"
        />
      </div>
      <div class="table">
        <el-table
          :data="state.user"
          style="width: 100%"
          v-loading="state.loading"
          v-if="state.user.length !== 0"
        >
          <el-table-column fixed prop="username" label="用户名" width="150" />
          <el-table-column prop="phone" label="手机号" width="120" />
          <el-table-column prop="role" label="角色" v-slot="scope" width="120">
            {{ scope.row.roler ? scope.row.roler.name : "未知" }}
          </el-table-column>
          <el-table-column
            prop="status"
            v-slot="scope"
            label="用户状态"
            width="120"
          >
            {{
              scope.row.status === "normal"
                ? "正常"
                : scope.row.status === "limit"
                ? "限制"
                : scope.row.status === "suspend"
                ? "冻结"
                : "注销"
            }}
          </el-table-column>
          <el-table-column prop="credit" label="信用分" width="120" />
          <el-table-column
            prop="createdAt"
            v-slot="scope"
            label="注册时间"
            width="180"
          >
            {{ formatDate(scope.row.createdAt, "-", true) }}
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            v-slot="scope"
            label="上次更新"
            width="180"
          >
            {{ formatDate(scope.row.updatedAt, "-", true) }}
          </el-table-column>
          <el-table-column
            prop="deletedAt"
            v-slot="scope"
            label="注销时间"
            width="180"
          >
            {{ formatDate(scope.row.deletedAt, "-", true) || "--" }}
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template v-slot="scope">
              <div class="but" v-if="scope.row.status !== 'determine'">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="openUpdateUserModal(scope.row)"
                >
                  <el-button type="primary" :icon="Edit" circle />
                </el-button>
                <el-select
                  class="m-2"
                  placeholder="用户操作"
                  size="large"
                  @change="handleAction($event, scope.row)"
                  v-if="scope.row.status !== 'determine'"
                >
                  <el-option
                    label="冻结"
                    v-if="
                      scope.row.status !== 'suspend' &&
                      scope.row.status !== 'determine'
                    "
                    value="suspend"
                  />
                  <el-option label="注销" value="determine" />
                  <el-option
                    label="解除冻结"
                    value="restore"
                    v-if="scope.row.status === 'suspend'"
                  />
                </el-select>
              </div>
              <div v-else>----</div>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else description="无数据" />

        <el-dialog
          v-model="state.comfirmModel"
          :before-close="closeModal"
          title="确认操作吗？"
          width="30%"
        >
          <div class="title">
            确认对用户
            <span class="user">{{ state.currentUser.username }}</span> 进行
            <span class="action"
              >{{
                state.currentExcution.value === "suspend"
                  ? "冻结"
                  : state.currentExcution.value === "determine"
                  ? "注销"
                  : "解除冻结"
              }} </span
            >操作吗？
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">取消</el-button>
              <el-button
                type="primary"
                :loading="state.excutting"
                @click="comfirm"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="pager">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="state.currentPage"
          :total="state.total"
          @update:current-page="changePage"
          :hide-on-single-page="true"
        />
      </div>
    </div>
    <el-dialog title="更新用户" v-model="state.updateUserModalShow">
      <el-form :rules="rulers" :model="state.updateUserForm" ref="form">
        <el-form-item label="用户名" :label-width="100">
          <el-input
            v-model="state.currentUser.username"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="100">
          <el-input
            v-model="state.currentUser.phone"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="100">
          <el-select
            v-model="state.updateUserForm.role"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in state.rolers"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="100">
          <el-input
            :value="state.currentUser.status === 'normal' ? '正常' : '冻结'"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="信用值" :label-width="100" prop="credit">
          <el-input
            v-model="state.updateUserForm.credit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="state.updateUserModalShow = false">取 消</el-button>
        <el-button type="primary" @click="updateUser" :loading="state.excutting"
          >更新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  fetchAllUser,
  removeUser,
  restoreUser,
  searchUser,
  userUpdator,
} from "../../api/user";
import { reactive, watchEffect, ref, onMounted } from "vue";
import ToolBar from "./ToolBar.vue";
import { ResponseWithCount } from "../../types/response";
import formatDate from "../../utils/formatDate";
import Title from "../../components/Title.vue";
import { Edit, User } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import delay from "../../utils/delay";
import { Role, User as UserType } from "../../types/User";
import { getRolers } from "../../api/roler";
import rulers from "../../utils/validators/userRuler";

const state = reactive({
  loading: false,
  total: 0,
  comfirmModel: false,
  excutting: false,
  // orginalData: null as null | ResponseWithCount,
  currentPage: 1,
  limit: 10,
  user: [] as any,
  updateUserModalShow: false,
  updateUserForm: {
    role: "",
    credit: 0,
  },
  currentUser: {} as UserType,
  currentExcution: {} as { name: string; value: string },
  rolers: [] as any[],

  userOpeates: [
    {
      label: "冻结",
      value: {
        name: "冻结",
        value: "suspend",
      },
    },
    {
      label: "注销",
      value: {
        name: "注销",
        value: "determine",
      },
    },
    {
      label: "解除冻结",
      value: {
        name: "解除冻结",
        value: "restore",
      },
    },
  ],
  opeate: null as any,
});

const router = useRouter();
const route = useRoute();

(async function () {
  const rolers = (await getRolers()) as unknown as ResponseWithCount<Role>;
  state.rolers = rolers.rows;
  if (route.query.page && route.query.limit) {
    state.currentPage = +route.query.page;
    state.limit = +route.query.limit;
  }
})();

watchEffect(async () => {
  if (route.query.page && route.query.limit) {
    await getUser(+route.query.page, +route.query.limit);
  }
});

async function getUser(page: number, limit: number) {
  state.loading = true;
  const user = (await fetchAllUser(
    page,
    limit
  )) as unknown as ResponseWithCount<UserType>;
  state.user = user.rows;
  state.total = user.count;
  state.loading = false;
  console.log(user);
}

function changePage(currentPage: number) {
  if (route.query.page) {
    if (currentPage === +route.query.page) {
      return;
    }
  }

  router.push({
    query: {
      ...route.query,
      page: currentPage,
    },
  });
}

function openUpdateUserModal(user: UserType) {
  state.updateUserModalShow = true;
  state.currentUser = user;
  state.updateUserForm.role = user.role;
  state.updateUserForm.credit = user.credit;
}

const form = ref();

async function updateUser() {
  form.value.validate(async (valid: any) => {
    if (valid) {
      state.excutting = true;
      const user = await userUpdator(
        state.currentUser.id as string,
        state.updateUserForm
      );

      if (route.query.page && route.query.limit) {
        await getUser(+route.query.page, +route.query.limit);
      }

      state.excutting = false;
      state.updateUserModalShow = false;
    } else {
      return false;
    }
  });
}

async function handleInput(val: string) {
  state.loading = true;
  const result = (await delay(searchUser, val)) as ResponseWithCount<UserType>;
  state.total = result.count;
  state.user = result.rows;
  state.loading = false;
}

function handleAction(target: any, user: UserType) {
  state.comfirmModel = true;
  state.currentExcution.value = target;
  state.currentUser = user;
}

function cancel() {
  state.comfirmModel = false;
  console.log("取消");
}

async function comfirm() {
  state.excutting = true;

  console.log(state.currentExcution.value);

  if (state.currentExcution.value === "suspend") {
    // 冻结
    const user = await userUpdator(state.currentUser.id as string, {
      status: state.currentExcution.value,
    });

    state.user = state.user.map((item: any) => {
      if (item.id === state.currentUser.id) {
        item.status = state.currentExcution.value;
      }
      return item;
    });

    state.excutting = false;
    state.comfirmModel = false;
  } else if (state.currentExcution.value === "determine") {
    await userUpdator(state.currentUser.id as string, { status: "determine" });

    const user = await removeUser(state.currentUser.id as string);

    const resp = (await fetchAllUser(
      +(route.query.page as string),
      +(route.query.limit as string)
    )) as unknown as ResponseWithCount<UserType>;

    state.user = resp.rows;
    state.excutting = false;
    state.comfirmModel = false;
  } else if (state.currentExcution.value === "restore") {
    await restoreUser(state.currentUser.id as string);
    await userUpdator(state.currentUser.id as string, { status: "normal" });

    const resp = (await fetchAllUser(
      +(route.query.page as string),
      +(route.query.limit as string)
    )) as unknown as ResponseWithCount<UserType>;

    state.user = resp.rows;
    state.excutting = false;
    state.comfirmModel = false;
  }
}

function closeModal(done: Function) {
  state.excutting = false;
  done();
}

async function fetchUserByFilter(value: Object) {
  state.loading = true;
  const resp = (await fetchAllUser(
    +(route.query.page as string),
    +(route.query.limit as string),
    value
  )) as unknown as ResponseWithCount<UserType>;

  state.loading = false;
  state.user = resp.rows;
  state.total = resp.count;
}
</script>

<style scoped lang="less">
.user-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 20px;

  .content {
    width: 100%;
    // height: calc(100% - 50px);
    overflow-y: scroll;
    margin-bottom: 10px;

    .tools {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
    }

    .table {
      width: 100%;
    }

    .pager {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}

.but {
  display: flex;
}

.user,
.action {
  color: red;
}
</style>
