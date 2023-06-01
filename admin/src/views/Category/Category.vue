<template>
  <div class="category-container">
    <Title title="分类管理" />
    <div class="content">
      <div class="toolBar">
        <div class="total">总分类：{{ state.data.length }}</div>
        <el-button type="primary" @click="state.dialogShow = true"
          >创建一级分类</el-button
        >
      </div>
      <RelationShip
        :data="state.data"
        @updateData="handleUpdate"
        @addCategory="addCategory"
      />
      <el-dialog v-model="state.dialogShow" title="创建一级类型">
        <el-form :model="state.form">
          <el-form-item label="类型名" :label-width="state.form.formLabelWidth">
            <el-input
              v-model="state.form.name"
              autocomplete="off"
              @input="state.errors = ''"
            />
            <div class="errors" v-if="state.errors">{{ state.errors }}</div>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.dialogShow = false">取消</el-button>
            <el-button
              :loading="state.loading"
              type="primary"
              @click="createCategory"
            >
              添加
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { getCategory, appendCategory } from "../../api/category";
import Title from "../../components/Title.vue";
import RelationShip from "./RelationShip.vue";
const state = reactive({
  data: [],
  dialogShow: false,
  form: {
    name: "",
    formLabelWidth: 120,
  },
  loading: false,
  errors: "",
});

const router = useRouter();

async function handleUpdate(data: any, resolve: Function) {
  resolve([]);

  if (data.level + 1 > 4) {
    return;
  }

  const resp = (await getCategory(data.id)) as any;
  resolve(resp);
}

async function addCategory(
  value: string,
  data: any,
  callback: Function,
  error: Function
) {
  console.log("value:", value, " ", "add:", data);
  const resp = (await appendCategory(data.level + 1, value, data.id)) as any;

  if (resp.code && resp.code !== 0) {
    error(resp.msg);

    return;
  }

  if (!data.children) {
    data.children = [];
  }

  data.children.push(resp);
  callback();
}

async function createCategory() {
  if (!state.form.name) {
    state.errors = "该值不能为空";
    return;
  }

  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

  if (!reg.test(state.form.name)) {
    state.errors =
      "错误！该值可以取下划线，字母，数字以及中文（不能以下划线开头）";
    return;
  }

  if (state.form.name.length > 15) {
    state.errors = "最多只允许15个字符";
    return;
  }

  const resp = (await appendCategory(1, state.form.name)) as any;
  if (resp.code && resp.code !== 0) {
    state.errors = resp.msg;
    return;
  }
  router.go(0);
}
</script>

<style scoped lang="less">
.category-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    .toolBar {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.errors {
  color: red;
}
</style>
