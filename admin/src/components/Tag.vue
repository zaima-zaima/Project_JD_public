<template>
  <el-tag
    v-for="tag in state.tags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <div class="group" v-if="state.tags.length < props.limit">
    <el-input
      v-if="state.showInput"
      ref="InputRef"
      v-model="state.value"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      class="button-new-tag ml-1"
      size="small"
      @click="showInput"
    >
      +
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watchEffect } from "vue";
import { ElInput } from "element-plus";

const state = reactive({
  tags: [] as string[],
  value: "",
  showInput: false,
});

interface PropsType {
  limit: number;
  data?: string[];
}

const props = defineProps<PropsType>();

const emits = defineEmits(["update"]);

const InputRef = ref<InstanceType<typeof ElInput>>();

watchEffect(() => {
  if (props.data) {
    state.tags = props.data;
  }
});

const handleClose = (tag: string) => {
  state.tags.splice(state.tags.indexOf(tag), 1);
};

const showInput = () => {
  state.showInput = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (state.value) {
    state.tags.push(state.value);
  }
  state.showInput = false;
  state.value = "";

  emits("update", state.tags);
};
</script>
