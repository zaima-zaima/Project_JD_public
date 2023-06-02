<template>
  <div class="registerForm-container">
    <div class="prograss">
      <Prograss
        :steps="state.steps"
        :current="route.query.step ? +route.query.step : 0"
      />
    </div>

    <div v-if="route.query.step && +route.query.step === 1" class="phone">
      <div class="phoneNumber">
        <div class="country">中国(+86)</div>
        <input
          type="number"
          v-model="state.form.phone"
          placeholder="请输入手机号"
          @focus="phoneFocus"
          @blur="phoneBlur"
          @input="onInput"
          maxlength="11"
          class="numberInput"
        />
        <div class="icon center">
          <span v-if="state.tip">X</span>
          <span v-if="state.verify === 'true' && !state.tip">√</span>
        </div>
      </div>
      <p class="tipWithCenter" v-if="state.tip && !state.form.phone">
        <Icon :type="StyleType.info" :size="25" /><span
          >验证完成后，你可以使用该手机登录或找回密码</span
        >
      </p>
      <p
        v-if="
          (state.verify === 'false' && state.form.phone) ||
          state.verify === 'false'
        "
        class="errorsTip tipWithCenter"
      >
        <Icon :type="StyleType.error" :size="20" /><span
          >手机号格式有误，请检查后重试</span
        >
      </p>
      <div class="code">
        <input
          type="text"
          v-model="state.form.captcha"
          placeholder="请填写验证码"
        />
        <div class="timer">
          <span
            class="hover-base send pointer"
            v-if="store.state.timer === 0"
            @click="send"
            >发送验证码</span
          >
          <span v-else>{{ store.state.timer }}</span>
          <span v-if="state.sending">发送中....</span>
        </div>
      </div>
      <div class="verify-error" v-if="state.codeVerify">
        验证码错误，请检查后重试
      </div>
      <div class="error">{{ state.error && state.error.msg }}</div>
      <div class="nextStep center" @click="nextStep">下一步</div>
      <!-- <div class="register-enterprise-indicator">
        <Icon :type="StyleType.chat" />
        <span>企业用户注册</span>
      </div> -->
    </div>

    <div v-if="route.query.step && +route.query.step === 2" class="info">
      <div class="username">
        <div class="username-box">
          <div class="username-title">用户名</div>
          <input
            type="text"
            v-model="state.form.username"
            @input="usernameInputAction"
            placeholder="请输入用户名"
            @blur="userNameBlur"
          />
          <div class="icon center">
            <span v-if="state.usernameCheck">√</span>
          </div>
        </div>
        <p v-if="state.usernameErrorMsg" class="errorsTip tipWithCenter">
          <Icon :type="StyleType.error" :size="20" /><span>{{
            state.usernameErrorMsg.msg
          }}</span>
        </p>
      </div>
      <div class="password">
        <div class="password-box">
          <div class="password-title">密码</div>
          <input
            type="password"
            v-model="state.form.password"
            placeholder="请输入密码"
            @input="passwordInputAction"
            @blur="passwordBlur"
          />
          <div class="icon center">
            <span v-if="state.passwordCheck">√</span>
          </div>
        </div>
        <p v-if="state.passwordErrorMsg" class="errorsTip tipWithCenter">
          <Icon :type="StyleType.error" :size="20" /><span>{{
            state.passwordErrorMsg
          }}</span>
        </p>
      </div>
      <div class="repassword">
        <div class="repassword-box">
          <div class="repassword-title">确认密码</div>
          <input
            type="password"
            v-model="state.form.repassword"
            placeholder="请重新输入密码"
            @input="comfirmPasswordInputAction"
            @blur="comfirmPasswordBlur"
          />
          <div class="icon center">
            <span v-if="state.rePasswordCheck">√</span>
          </div>
        </div>

        <p v-if="state.repasswordErrorMsg" class="errorsTip tipWithCenter">
          <Icon :type="StyleType.error" :size="20" /><span>{{
            state.repasswordErrorMsg
          }}</span>
        </p>
      </div>
      <div class="nextStep center" @click="comfirmRegister">
        {{ state.preduceding ? "请稍后" : "确认注册" }}
      </div>
    </div>

    <Complate v-if="route.query.step && +route.query.step === 3" />
  </div>
</template>

<script lang="ts" setup>
import Prograss from "../../components/Prograss/index.vue";
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
import { Ref, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Complate from "./Complate.vue";
import { useStore } from "vuex";
import { checkCode } from "../../api/sms";
import { checkUser, signup } from "../../api/signup";
import rolers from "../../../../server/configure/roler";

const reg =
  /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
  preduceding: false,
  sending: false,
  error: null as any,
  tip: false,
  usernameCheck: false,
  passwordCheck: false,
  rePasswordCheck: false,
  usernameErrorMsg: null as any,
  passwordErrorMsg: "",
  repasswordErrorMsg: "",
  verify: "",
  codeVerify: false,
  form: {
    captcha: "",
    phone: "",
    username: "",
    role: "",
    password: "",
    repassword: "",
  },
  steps: ["验证手机号", "填写账号信息", "注册成功"],
  count: 0,
});

state.form.role = rolers.user;

function phoneFocus() {
  if (state.count < 1) {
    state.tip = true;
  }

  state.count = state.count + 1;
}

function phoneBlur() {
  state.tip = false;
  if (reg.test(state.form.phone)) {
    state.verify = "true";
  } else {
    state.verify = "false";
  }
}

async function nextStep() {
  const data = (await checkCode(state.form.phone, state.form.captcha)) as any;

  if (data.code && data.code !== 0) {
    state.codeVerify = true;
  } else {
    router.push({
      query: {
        ...route.query,
        step: 2,
      },
    });
  }
}

async function comfirmRegister() {
  if (state.preduceding) {
    return;
  }

  if (state.usernameCheck && state.passwordCheck && state.rePasswordCheck) {
    state.preduceding = true;

    const resp = (await signup(state.form)) as any;
    if (!resp.code && resp) {
      router.push({
        query: {
          ...route.query,
          step: 3,
        },
      });
    }
    state.preduceding = false;
  } else {
    return;
  }
}

async function send() {
  if (state.sending) {
    return;
  }

  if (!reg.test(state.form.phone)) {
    state.verify = "false";
    return;
  }
  state.sending = true;
  state.error = await store.dispatch("SendSms", state.form.phone);
  state.sending = false;
}

async function userNameBlur() {
  if (!state.form.username) {
    return;
  }

  const user = (await checkUser(state.form.username)) as any;
  if (user && !user.code) {
    state.usernameCheck = true;
  } else if (user.code && user.code !== 0) {
    state.usernameErrorMsg = user;
  }
}

function passwordBlur() {
  if (state.form.password.length < 8 || state.form.password.length > 16) {
    state.passwordErrorMsg = "密码输入错误，密码必须是8-16位之间";
  } else {
    state.passwordCheck = true;
  }
}

function comfirmPasswordBlur() {
  if (!state.form.repassword) {
    return;
  }

  if (state.form.password === state.form.repassword) {
    state.rePasswordCheck = true;
  } else {
    state.repasswordErrorMsg = "密码不一致，请检查后重试";
  }
}

function onInput() {
  state.verify = "true";

  state.form.phone = state.form.phone + "";

  if (state.form.phone.length > 11) {
    state.form.phone = state.form.phone.slice(0, 11);
  }
}

// const numberInput = ref() as Ref<HTMLInputElement>

function usernameInputAction() {
  state.usernameCheck = false;
  state.usernameErrorMsg = null;
}

function passwordInputAction() {
  state.passwordCheck = false;
  state.passwordErrorMsg = "";
}

function comfirmPasswordInputAction() {
  state.rePasswordCheck = false;
  state.repasswordErrorMsg = "";
}
</script>

<style scoped lang="less">
@borderColor: #eeecec;

.registerForm-container {
  width: 500px;
  height: 300px;
  // background-color: #fa0e0e;

  .info {
    display: flex;
    flex-direction: column;

    .username,
    .password,
    .repassword {
      display: flex;
      margin-top: 30px;
      height: 100%;
      font-size: 16px;
      flex-direction: column;

      .username-box,
      .password-box,
      .repassword-box {
        display: flex;
        box-sizing: border-box;
        border: 1px solid @borderColor;
        height: 100%;

        .username-title,
        .password-title,
        .repassword-title {
          width: 100px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: inherit;
          box-sizing: border-box;
          border-right: 1px solid @borderColor;
        }

        input {
          flex: 1;
          box-sizing: border-box;
          padding: 10px;
          font-size: inherit;
          border: none;
          outline: none;
        }

        .icon {
          width: 30px;
        }
      }
    }
  }

  p {
    margin-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  .prograss {
    width: 100%;
    height: 50px;
    // background-color: #36fd04;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .phoneNumber {
    width: 100%;
    height: 50px;
    // background-color: aqua;
    margin-top: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #eeecec;

    .country {
      width: 100px;
      height: 100%;
      box-sizing: border-box;
      border-right: 1px solid @borderColor;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      flex: 1 1 auto;
      border: none;
      outline: none;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        appearance: none;
      }
    }

    .icon {
      width: 50px;
      height: 100%;
    }
  }

  .verify {
    width: 100%;
    height: 60px;
    border: 1px solid #eeecec;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
      border: 1px solid #999;
    }
  }

  .code {
    width: 100%;
    height: 50px;
    // background: red;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;

    input {
      border: none;
      outline: none;
      height: 100%;
      flex: 1 1 auto;
    }

    .timer {
      width: 60px;
      height: 100%;
      margin-left: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      .send {
        color: @baseColor;
      }
    }
  }

  .nextStep {
    width: 100%;
    height: 50px;
    background: @baseColor;
    color: #fff;
    font-size: 20px;
    margin-top: 25px;
    cursor: pointer;
  }

  .register-enterprise-indicator {
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      span {
        color: @baseColor;
      }
    }

    span {
      margin-left: 10px;
    }
  }
}

.errorsTip {
  color: red;
  span {
    color: inherit;
  }
}

.tipWithCenter {
  display: flex;
  align-items: center;
}
</style>
