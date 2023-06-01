<template>
  <div class="diolog-container">
    <el-dialog v-model="props.show" :before-close="close" :title="props.title">
      <el-form :model="state.form">
        <el-form-item label="角色名称" label-width="100">
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
          <el-button @click="cancelModel">取消</el-button>
          <el-button
            type="primary"
            :loading="props.loading"
            @click="confirmModal"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect } from "vue";

interface PropsType {
  show: boolean;
  loading: boolean;
  title: string;
  value?: null | string;
}

const emits = defineEmits(["submitRoler", "close", "updateRoler"]);

const props = defineProps<PropsType>();

const state = reactive({
  form: {
    name: "",
  },
  error: "",
});

watchEffect(() => {
  if (props.value) {
    state.form.name = props.value;
  } else {
    state.form.name = "";
  }
});

function confirmModal() {
  if (!state.form.name) {
    state.error = "该值不能为空";
    return;
  }

  const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/;

  if (!reg.test(state.form.name)) {
    state.error = "错误！该值只能是数字和字母的组合，长度为1-10";
    return;
  }

  if (props.value) {
    emits("updateRoler", state.form.name);
  } else {
    emits("submitRoler", state.form.name);
  }
}

function cancelModel() {
  state.form.name = "";
  close();
}

function close() {
  state.form.name = "";
  emits("close");
}
</script>

<style scoped lang="less">
.errors {
  color: red;
}
</style>
