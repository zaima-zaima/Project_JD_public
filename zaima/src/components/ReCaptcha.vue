<template>
  <div class="reCaptcha-container">
    <div class="reCaptcha" @click="start" v-if="!state.validator">
      点击完成验证
    </div>
    <Modal :show="state.show">
      <div class="captcha" ref="captcha"></div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import Modal from "./Modal.vue";

interface PropsType {
  clientId: string;
}
const props = defineProps<PropsType>();
const emits = defineEmits(["trigger"]);
const state = reactive({
  show: false,
  validator: false,
});

onMounted(() => {
  const script = document.createElement("script");
  script.src = `https://recaptcha.net/recaptcha/api.js?οnlοad=ReCaptchaLoaded&render=explicit&hl=zh-CN`;
  document.head.appendChild(script);
});

const captcha = ref();

function start() {
  state.show = true;

  nextTick(() => {
    console.log(props.clientId);

    (window as any).grecaptcha.render(captcha.value, {
      sitekey: props.clientId,
      callback(token: any) {
        setTimeout(() => {
          emits("trigger", token);
          state.validator = true;
          state.show = false;
        }, 2000);
      },
    });
  });
}
</script>

<style scoped lang="less">
.captcha {
  padding: 20px;
  background-color: #fff;
}

.reCaptcha {
  width: 100px;
  height: 30px;
  border: 1px solid;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>
