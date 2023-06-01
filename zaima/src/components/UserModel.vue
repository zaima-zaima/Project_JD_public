<template>
  <div class="user-model-container">
    <div class="user-info">
      <div class="avatar" @click="goPersonalInfo">
        <Avatar
          :src="
            store.state.user
              ? store.state.user.avatar
                ? store.state.user.avatar
                : userDefaultAvatar
              : userAvatar
          "
          :size="60"
        />
      </div>
      <div class="privilege">
        <div class="user-operator">
          <div class="vip-level">
            <Icon :type="StyleType.huangguan" :size="20" />
            <span class="plus">PLUS</span>
          </div>
          <div class="logout hover-base pointer" @click="logout">退出</div>
        </div>
        <div class="vip-ad hover-base pointer">
          开通PLUS, 平均省1210元/年&gt;
        </div>
      </div>
    </div>
    <div class="user-privilege-ad">
      <div class="user-privilege-item freeTask">
        <div class="img">
          <Avatar :src="chown" :size="40" />
          <div class="avatar_title">免费试用</div>
        </div>
      </div>
      <div class="user-privilege-item hover-base">
        <div class="img">
          <Avatar :src="delvierCart" :size="40" />
          <div class="avatar_title">运费券</div>
        </div>
      </div>
      <div class="user-privilege-item hover-base">
        <div class="img">
          <Avatar :src="dou" :size="40" />
          <div class="avatar_title">10倍返京豆</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "./Avatar.vue";
import Icon from "./Icon.vue";
import { useStore } from "vuex";
import { StyleType } from "../types/enum";
import { useRouter } from "vue-router";
import userDefaultAvatar from "/src/assets/userDefaultAvatar.jpeg";
import userAvatar from "/src/assets/userAvatar.png";
import chown from "/src/assets/chown.png";
import delvierCart from "/src/assets/deliver_cart.png";
import dou from "/src/assets/dou.png";

const router = useRouter();
const store = useStore();

function goPersonalInfo() {
  router.push({
    name: "OverView",
    params: {
      uid: store.state.user.id,
    },
  });
}

function logout() {
  store.commit("logout");
  router.push("/");
}
</script>

<style scoped lang="less">
.user-model-container {
  width: 280px;
  height: 200px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .user-info {
    width: 100%;
    flex: 0 0 50%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
    }

    .privilege {
      flex-grow: 1;
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .user-operator {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 30px;

        .vip-level {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2px 5px;
          border-radius: 5px;
          height: fit-content;
          background-color: rgb(202, 187, 103);

          .plus {
            margin-left: 3px;
            color: #fff;
          }
        }
      }

      .vip-ad {
        text-align: left;
      }
    }
  }

  .user-privilege-ad {
    width: 100%;
    flex: 0 0 50%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .user-privilege-item {
      width: 60px;
      cursor: pointer;

      &.freeTask {
        .img {
          .avatar_title {
            background-color: rgb(202, 187, 103);
            color: #fff;
          }
        }
      }

      .img {
        color: inherit;

        .avatar_title {
          color: inherit;
        }
      }
    }
  }
}
</style>
