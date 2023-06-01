<template>
  <div class="user-container">
    <div class="user-info">
      <div class="user-avatar pointer" @click="jumping">
        <Avatar
          :src="
            store.state.user
              ? store.state.user.avatar
                ? store.state.user.avatar
                : userDefaultAvatar
              : userAvatar
          "
          :size="30"
        />
      </div>
      <div class="user-login-and-register">
        <div class="title">
          Hi~
          <span v-if="!store.state.user">欢迎逛京东!</span>
          <span v-else>{{ store.state.user.username }}</span>
        </div>
        <div class="login-box" v-if="!store.state.user">
          <span
            class="pointer login hover-base"
            @click="goPage('Login', { sign: configure.user })"
            >登录</span
          >
          <span>|</span>
          <span
            class="pointer signup hover-base"
            @click="
              goPage('Register', {
                step: 1,
                type: 'personal',
                sign: configure.user,
              })
            "
            >注册</span
          >
        </div>
        <div class="loginout pointer hover-base" @click="logout" v-else>
          退出
        </div>
      </div>
    </div>
    <div v-if="!store.state.user" class="user-attach">
      <div class="button newer">新人福利</div>
      <div class="button plus">PLUS会员</div>
    </div>
    <div class="vipIndicator" v-if="store.state.user && !store.state.user.vip">
      开通PLUS, 平均省1210元/年
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import Avatar from "../../../../components/Avatar.vue";
import { useRouter } from "vue-router";
import configure from "../../../../../../server/configure/roler";
import userDefaultAvatar from "/src/assets/userDefaultAvatar.jpeg";
import userAvatar from "/src/assets/userAvatar.png";
import roler from "../../../../../../server/configure/roler";

const store = useStore();
const router = useRouter();
function logout() {
  store.commit("logout");
}

function goPage(page: string, query: any) {
  router.push({
    name: page,
    query: {
      ...query,
    },
  });
}

function jumping() {
  if (store.state.user) {
    router.push({
      name: "OverView",
      params: {
        uid: store.state.user.id,
      },
    });
  } else {
    router.push({
      name: "Login",
      query: {
        sign: roler.user,
      },
    });
  }
}
</script>

<style scoped lang="less">
.user-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .user-info {
    width: 100%;
    height: 50px;
    // background-color: tomato;
    display: flex;
    align-items: center;
    .user-avatar {
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      padding: 5px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
    }
  }
  .user-attach {
    display: flex;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    .button {
      padding: 5px 8px;
      background: yellow;
      margin: 0 5px;
      outline: none;
      color: #fff;
      cursor: pointer;
      border-radius: 10px;
      transition: 0.3s;
      &.newer {
        background-color: @baseColor;
      }
      &.plus {
        background-color: #7c6262;
        color: rgb(231, 200, 162);

        &:hover {
          background-color: @baseColor;
          color: #fff;
        }
      }
    }
  }
  .vipIndicator {
    padding: 5px;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 10px;
    margin-top: 10px;
    color: @baseColor;
    &:hover {
      background-color: @baseColor;
      color: #fff;
      cursor: pointer;
    }
  }
}

.login-box {
  .login,
  .signup {
    margin: 0px 5px;
  }
}
</style>
