<template>
  <div class="relationship-container">
    <el-tree
      :data="props.data"
      :props="NodeProp"
      :load="loadNode"
      :auto-expand-parent="false"
      lazy
      :on-current-change="handleChange"
      :render-content="renderContent"
      v-if="props.data.length !== 0"
    />

    <el-empty description="无数据" v-else />

    <el-dialog
      v-model="state.dialogShow"
      title="添加类型"
      @close="handlerClose"
    >
      <div class="tip">
        在类型
        <span class="category">{{ state.current.name }}</span> 下创建新类型
      </div>
      <el-form :model="state.form">
        <el-form-item label="类型名" :label-width="state.form.formLabelWidth">
          <el-input
            v-model="state.form.name"
            autocomplete="off"
            @input="state.error = ''"
          />
          <div class="errors" v-if="state.error">{{ state.error }}</div>
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

    <el-dialog v-model="state.forbid">
      <div class="error-container">
        <el-icon :size="80">
          <WarningFilled />
        </el-icon>
        <div class="tip">无法在该分类下创建分类，最多只能存在四级分类</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import { reactive } from "vue";
import { WarningFilled } from "@element-plus/icons-vue";

interface Tree {
  name: string;
  leaf?: boolean;
}

interface PropsType {
  data: Array<any>;
}

const emits = defineEmits(["updateData", "addCategory"]);

const NodeProp = {
  label: "name",
  children: "children",
  isLeaf: "done",
};

const props = defineProps<PropsType>();

const state = reactive({
  data: [],
  dialogShow: false,
  form: {
    formLabelWidth: 180,
    name: "",
  },
  current: {} as any,
  loading: false,
  forbid: false,
  error: "",
});

const append = (data: any) => {
  console.log("apped", data);
  state.current = data;

  if (data.level !== 4) {
    state.dialogShow = true;
  } else {
    state.forbid = true;
  }

  //   const newChild = { id: "tyhjkhuyhjbm", name: "testtest", children: [] };
  //   if (!data.children) {
  //     data.children = [];
  //   }
  //   data.children.push(newChild);
  //   dataSource.value = [...dataSource.value]
};

function createCategory() {
  if (!state.form.name) {
    state.error = "该值不能为空";
    return;
  }

  const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

  if (!reg.test(state.form.name)) {
    state.error =
      "错误！该值可以取下划线，字母，数字以及中文（不能以下划线开头）";
    return;
  }

  if (state.form.name.length > 15) {
    state.error = "最多只允许15个字符";
    return;
  }

  state.loading = true;
  emits(
    "addCategory",
    state.form.name,
    state.current,
    () => {
      state.loading = false;
      state.dialogShow = false;
      state.form.name = "";
    },
    callback
  );
}

const remove = (node: Node, data: Tree) => {
  //   const parent = node.parent
  //   const children: Tree[] = parent.data.children || parent.data
  //   const index = children.findIndex((d) => d.id === data.id)
  //   children.splice(index, 1)
  //   dataSource.value = [...dataSource.value]
};

const renderContent = (
  h: any,
  {
    node,
    data,
    store,
  }: {
    node: Node;
    data: Tree;
    store: Node["store"];
  }
) => {
  return h(
    "span",
    {
      class: "custom-tree-node",
    },
    h("span", null, node.label),
    h(
      "span",
      null,
      h(
        "a",
        {
          onClick: () => append(data),
        },
        "添加"
      ),
      h(
        "a",
        {
          style: "margin-left: 8px",
          onClick: () => remove(node, data),
        },
        "删除"
      )
    )
  );
};

function callback(error: string) {
  state.error = error;
  state.loading = false;
  return;
}

function handleChange(current: any) {
  console.log(current);
}

function handlerClose() {
  state.form.name = "";
  state.error = "";
}

const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  console.log("node:", node);
  emits("updateData", node.data, resolve);
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style lang="less" scoped>
.tip {
  width: 100%;
  // height: 50px;
  text-align: center;
  line-height: 50px;

  .category {
    color: red;
  }
}

.error-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  color: #ccc;

  .tip {
    color: inherit;
    margin-top: 20px;
  }
}

.errors {
  color: red;
}
</style>
