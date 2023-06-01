<template>
  <div
    class="upload-container"
    ref="uploadContainer"
    :style="{
      fontSize: state.width * 0.4 + 'px',
      border: props.imgType ? 'none' : '1px solid #000',
    }"
  >
    <span v-if="!props.imgType">+</span>
    <slot v-else></slot>
    <input type="file" :name="props.name" @change="change" ref="input" />
    <Modal :show="state.show">
      <Alert
        :text="state.errorMsg"
        :alert="true"
        @comfirm="
          state.show = false;
          state.errorMsg = '';
        "
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, Ref, ref, watchEffect } from "vue";
import request from "../api/request";
import Alert from "./Alert.vue";
import Modal from "./Modal.vue";

interface PropsType {
  name: string;
  url: string;
  imgType?: boolean;
  limit?: number;
  currentCount?: number;
  types?: Array<String>;
}

const props = withDefaults(defineProps<PropsType>(), {
  currentCount: 0,
});

const state = reactive({
  width: 0,
  height: 0,
  count: 0,
  show: false,
  errorMsg: "",
});

const emits = defineEmits(["uploadPath"]);

const input = ref();
const uploadContainer = ref() as Ref<HTMLElement>;

watchEffect(() => {
  state.count = props.currentCount;
});

onMounted(() => {
  state.width = uploadContainer.value.clientWidth;
  state.height = uploadContainer.value.clientHeight;
});

async function change() {
  if (props.limit && state.count >= props.limit) {
    state.show = true;
    state.errorMsg = `超出上传数量：你只能上传${props.limit}张`;
    return;
  }

  const formData = new FormData();
  formData.append(props.name, input.value.files[0]);

  if (props.types && props.types.length !== 0) {
    const extension = input.value.files[0].type.split("/")[1];
    if (!props.types?.includes(extension)) {
      state.show = true;
      state.errorMsg = `检查你要上传文件的类型，仅支持${props.types?.join(
        "、"
      )}类型文件`;
      return;
    }
  }

  const resp = await request.post(props.url, formData);
  state.count = state.count + 1;

  emits("uploadPath", resp);
}
</script>

<style scoped lang="less">
.upload-container {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: inherit;
  }

  input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
