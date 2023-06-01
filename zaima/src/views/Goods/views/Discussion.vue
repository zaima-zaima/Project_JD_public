<template>
  <div class="discussion-container">
    <div class="discussion-inner">
      <div class="title">加入他们，看看商品好不好</div>
      <div
        class="discussion-area"
        v-if="store.state.user && state.msg"
        ref="discussionArea"
      >
        <div
          class="discussion-item"
          :class="{
            self: store.state.user && item.userid === store.state.user.id,
          }"
          v-for="item in state.msg"
        >
          <div class="title">
            <span> {{ item.user && item.user.username }}</span>
            <span> {{ formatDate(item.createdAt, false, "-", true) }}</span>
          </div>
          <div class="discussion-content">
            <div
              class="avatar"
              v-if="!store.state.user || item.userid !== store.state.user.id"
            >
              <Avatar :size="20" :src="userAvatar" />
            </div>

            <div class="content">{{ item.msg }}</div>
            <div
              class="avatar"
              v-if="store.state.user && item.userid === store.state.user.id"
            >
              <Avatar :size="20" :src="userAvatar" />
            </div>
          </div>
        </div>
      </div>
      <div class="discussion-area notLogin" v-else>
        <div class="tip" @click="checkLogin">请登录后查看</div>
      </div>
      <div class="send-area" v-if="store.state.user">
        <textarea
          type="text"
          v-model="state.value"
          @focusin="checkLogin"
          class="input"
          @keydown.enter="sendMsg"
        ></textarea>
        <div
          class="send pointer"
          :class="{ disabled: !state.value }"
          @click="sendMsg"
        >
          发送
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  Ref,
  ref,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getDiscussion, insertDiscussion } from "../../../api/discussion";
import Avatar from "../../../components/Avatar.vue";
import { Discussion } from "../../../types/Discussion";
import formatDate from "../../../utils/formatDate";
import userAvatar from "/src/assets/userAvatar.png";
const socket = getCurrentInstance()?.appContext.config.globalProperties.$socket;

const state = reactive({
  msg: [] as Discussion[],
  value: "",
  sending: false,
});

const store = useStore();
const route = useRoute();
const router = useRouter();
watchEffect(async () => {
  const resp = (await getDiscussion(
    20,
    route.params.id as string
  )) as unknown as Discussion[];
  state.msg = resp.reverse();
});

const discussionArea = ref() as Ref<HTMLElement>;

async function sendMsg() {
  if (!state.value || state.sending) {
    return;
  }

  state.sending = true;

  const resp = (await insertDiscussion({
    userid: store.state.user.id as string,
    msg: state.value,
    goodsid: route.params.id,
  })) as unknown as Discussion;
  state.msg.push(resp);
  state.sending = false;
  state.value = "";
  scrollBy();
}

socket.on("discussion", (data: Discussion) => {
  state.msg.push(data);
  scrollBy();
});

function scrollBy() {
  if (!discussionArea.value) {
    return;
  }

  setTimeout(() => {
    discussionArea.value.scrollTop = discussionArea.value.scrollHeight;
  }, 50);
}

onMounted(() => {
  scrollBy();
});

function checkLogin() {
  if (!store.state.user) {
    router.push({
      name: "Login",
      query: {
        from: route.path,
      },
    });
  }
}
</script>

<style scoped lang="less">
.discussion-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #383333;
  .discussion-inner {
    width: 960px;
    height: 600px;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .discussion-area {
      width: 100%;
      height: 500px;
      box-sizing: border-box;
      border: 1px solid #d5d0d0;
      overflow: scroll;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;

      &.notLogin {
        background-color: #d7d2d2;
        display: flex;
        justify-content: center;
        align-items: center;

        .tip {
          padding: 10px;
          background-color: @baseColor;
          color: #fff;
          border-radius: 10px;
          cursor: pointer;
        }
      }

      .discussion-item {
        display: flex;
        margin-top: 30px;
        flex-direction: column;
        &.self {
          align-items: flex-end;
        }

        .title {
          span {
            margin: 0px 5px;
          }
        }

        .discussion-content {
          box-sizing: border-box;
          display: flex;
          width: fit-content;
          > .avatar {
            width: 40px;
            height: 40px;
          }

          margin: 10px;
          .content {
            width: inherit;
            padding: 10px 5px;
            background-color: #fff;
            margin: 0px 10px;
            border-radius: 10px;
          }
        }
      }
    }

    .send-area {
      display: flex;
      padding: 20px 0px;
      .input {
        flex: 1;
        height: 40px;
        line-height: 16px;
        font-size: 16px;
        box-sizing: border-box;
        padding: 5px;
        word-wrap: break-word;
        resize: none;
        outline: none;
      }
      .send {
        width: 70px;
        height: 40px;
        background-color: @baseColor;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-left: 30px;
        &.disabled {
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
