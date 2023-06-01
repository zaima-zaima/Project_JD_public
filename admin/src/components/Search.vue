<template>
  <div class="input-container">
    <el-input
      v-model="state.keyword"
      @input="handelInput"
      class="w-50 m-2"
      :placeholder="placeholder"
      :prefix-icon="Search"
    />
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";

interface PropsType {
  placeholder: string;
}

defineProps<PropsType>();

const state = reactive({
  keyword: "",
});

const emits = defineEmits(["input"]);

function handelInput() {
  emits("input", state.keyword);
}
</script>

<style scoped lang="less">
.input-container {
  width: 100%;
  height: 100%;
}
</style>
