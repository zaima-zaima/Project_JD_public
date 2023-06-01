<template>
  <div class="tools-bar-container">
    <div class="tools">
      <div class="total">总数据： {{ props.total }} 条</div>
      <div class="view-area">
        角色：
        <el-select
          v-model="state.userType"
          class="m-2 ml-1"
          placeholder="Select"
          size="small"
          @change="getSelectedUserArea"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="item in state.userTypes"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="view-area">
        状态：
        <el-select
          v-model="state.currentStatus"
          class="m-2 ml-1"
          placeholder="Select"
          size="small"
          @change="getUserByStatus"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="item in state.status"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="search-box">
      <Search
        @input="inputHandle"
        placeholder="请输入用户名或手机号以搜索用户"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getRolers } from "../../api/roler";
import { ResponseWithCount } from "../../types/response";
import Search from "../../components/Search.vue";
import { Role } from "../../types/User";

interface PropsType {
  total: number;
}

const props = defineProps<PropsType>();

const state = reactive({
  userType: "",
  userTypes: [] as any[],
  status: [
    { name: "冻结", value: "suspend" },
    { name: "正常", value: "normal" },
    { name: "注销", value: "determine" },
  ],
  currentStatus: "",
});

const emits = defineEmits(["input", "fetchUserByFilter"]);

(async () => {
  const resp = (await getRolers()) as unknown as ResponseWithCount<any>;
  state.userTypes = resp.rows;
})();

function inputHandle(val: string) {
  emits("input", val);
}

function getSelectedUserArea() {
  if (state.userType || state.currentStatus) {
    let filter = {} as any;

    if (state.userType) {
      filter.role = state.userType;
    }

    if (state.currentStatus) {
      filter.status = state.currentStatus;
    }

    emits("fetchUserByFilter", filter);
    return;
  }

  emits("fetchUserByFilter");
}

function getUserByStatus() {
  if (state.currentStatus || state.userType) {
    let filter = {} as any;

    if (state.currentStatus) {
      filter.status = state.currentStatus;
    }

    if (state.userType) {
      filter.role = state.userType;
    }

    emits("fetchUserByFilter", filter);
    return;
  }

  emits("fetchUserByFilter");
}
</script>

<style scoped lang="less">
.tools-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;

  .tools {
    flex: 1 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    .view-area {
      margin-left: 30px;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
  }

  .search-box {
    width: 300px;
    justify-self: flex-end;
    height: 100%;
  }
}
</style>
