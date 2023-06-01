<template>
  <div class="baitiao-container">
    <Modal :show="state.show">
      <div class="loading">
        <Loading text="开通中" :size="220" />
      </div>
    </Modal>
    <Modal :show="state.result">
      <Alert :text="state.data.msg" :alert="true" @comfirm="comfirm" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { baitiaoCreator } from "../api/login";
import Alert from "./Alert.vue";
import Loading from "./Loading.vue";
import Modal from "./Modal.vue";

const state = reactive({
  show: true,
  result: false,
  data: {} as { code: number; msg: string; data: any },
  once: true,
});

const store = useStore();

const emits = defineEmits(["close"]);

watchEffect(async () => {
  if (store.state.user && state.once) {
    console.log("true");

    state.data = (await baitiaoCreator(store.state.user.id)) as unknown as any;
    state.result = true;
    state.once = false;
  }
});

function comfirm() {
  state.show = false;
  state.result = false;
  emits("close");
}
</script>

<style scoped lang="less">
.baitiao-container {
  .loading {
    width: 600px;
    height: 400px;
    background-color: #fff;
  }
}
</style>
