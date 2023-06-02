<template>
  <div class="login-container">
    <Banner text="管理员登录" />
    <div class="body">
      <div class="login-container">
        <div class="login-box">
          <div class="title">管理员登录</div>
          <div class="input-box">
            <div class="input username">
              <div class="icon">
                <Icon :size="30" :type="StyleType.user" />
              </div>
              <input
                type="text"
                v-model="state.form.username"
                placeholder="请输入账户名"
                @input="state.errors.username = ''"
              />
              <div class="error usernameError" v-if="state.errors.username">
                {{ state.errors.username }}
              </div>
            </div>
            <div class="input password">
              <div class="icon">
                <Icon :size="30" :type="StyleType.lock" />
              </div>
              <input
                v-model="state.form.password"
                type="password"
                placeholder="请输入密码"
                @input="state.errors.password = ''"
              />
              <div class="error passwordError" v-if="state.errors.password">
                {{ state.errors.password }}
              </div>
            </div>
            <div class="forgetPass">忘记密码</div>
          </div>
          <div class="login-button" @click="goLogin">
            <div class="button">
              {{ state.logining ? "登陆中" : "登&nbsp;&nbsp;录" }}
            </div>
          </div>
          <div class="footer">
            <div class="footer-inner">
              <div class="z"></div>
              <div class="register-indicator" @click="goRegister">
                <div class="icon">
                  <Icon :type="StyleType.arrowRightSmall" />
                </div>
                <span class="register-text">立即注册</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <Reference />
    </div>
    <el-dialog v-model="state.dialog" title="登录错误" width="30%">
      <span>{{ store.state.user && store.state.user.msg }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialog = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Banner from "../components/Banner.vue";
import Icon from "../components/Icon.vue";
import { useRouter } from "vue-router";
import { StyleType } from "../types/enum";
import Reference from "../components/Reference/index.vue";
import {
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
const socket = getCurrentInstance()?.appContext.config.globalProperties.$socket;
const store = useStore();
const router = useRouter();

const state = reactive({
  logining: false,
  form: {
    username: "",
    password: "",
  },
  dialog: false,
  errors: {
    username: "",
    password: "",
  },
});

watchEffect(() => {
  if (
    store.state.user &&
    (!store.state.user.code || store.state.user.code === 0)
  ) {
    router.push("/");
  }
});

async function goLogin() {
  if (state.logining) {
    return;
  }

  if (!state.form.username) {
    state.errors.username = "用户名不能为空";
    return;
  }

  if (!state.form.password) {
    state.errors.password = "密码不能为空";
    return;
  }

  state.logining = true;

  const admin = await store.dispatch("Login", state.form);
  state.logining = false;

  if (admin.code && admin.code !== 0) {
    state.dialog = true;
  }
}

onBeforeUnmount(() => {
  if (
    store.state.user &&
    (!store.state.user.code || store.state.user.code === 0)
  ) {
    socket.emit("login", store.state.user);
  }
});

function goRegister() {
  router.push({
    name: "Register",
  });
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .body {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;

    .info {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f8e4e4;

      .info-text {
        margin-left: 5px;
      }
    }

    .login-container {
      width: 100%;
      flex: 1 1 auto;
      background-image: url("../assets/loginBackground.png");
      background-repeat: no-repeat;
      background-size: cover;

      .login-box {
        width: 350px;
        height: 400px;
        background-color: #fff;
        margin-left: 60%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        .tip {
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #f8e4e4;

          .tip-text {
            margin-left: 5px;
          }
        }

        .title {
          width: 100%;
          height: 80px;
          text-align: center;
          line-height: 80px;
          font-size: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #f0ebeb;
        }

        .input-box {
          width: 100%;
          height: 160px;
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          flex-direction: column;

          .input {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            border: 1px solid #f0ebeb;

            &.username {
              margin-bottom: 15px;
            }

            .icon {
              width: 50px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            input {
              flex: 1;
              height: 100%;
              box-sizing: border-box;
              padding: 3px;
              border: none;
              outline: none;
              margin-left: 3px;
              font-size: 14px;
            }
          }

          .forgetPass {
            margin-bottom: 0;
            align-self: flex-end;
            flex: 1;
            display: flex;
            align-items: flex-end;

            &:hover {
              color: @baseColor;
              cursor: pointer;
            }
          }
        }

        .login-button {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 10px;
          cursor: pointer;

          .button {
            width: 100%;
            height: 100%;
            background-color: @baseColor;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
          }
        }

        .footer {
          margin-bottom: 0;
          display: flex;
          flex: 1;
          justify-self: flex-end;

          .footer-inner {
            width: 100%;
            height: 40px;
            align-self: flex-end;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .login-method {
              font-size: 14px;
              cursor: pointer;

              &:hover {
                .login-method-text {
                  color: @baseColor;
                  text-decoration: underline;
                }
              }

              span {
                margin: 0px 2px;
                font-size: inherit;
              }
            }

            .register-indicator {
              display: flex;
              color: @baseColor;
              cursor: pointer;

              &:hover {
                .register-text {
                  text-decoration: underline;
                }
              }

              span {
                color: inherit;
              }

              .icon {
                width: 18px;
                height: 18px;
                background-color: @baseColor;
                color: #fff;
                border-radius: 50%;
                line-height: 18px;
                text-align: center;
                margin-right: 5px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.error {
  color: red;
  font-size: 12px;
}
</style>
