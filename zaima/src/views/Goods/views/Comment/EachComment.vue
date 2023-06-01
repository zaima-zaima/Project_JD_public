<template>
  <div class="each-comment-container">
    <div class="title">
      <div class="avatar">
        <Avatar
          :src="
            props.data.user && props.data.user.avatar
              ? props.data.user.avatar
              : userDefaultAvatar
          "
          :size="40"
        />
      </div>

      <div class="username">{{ props.data.user?.username }}</div>
      <StarGroup :count="5" :current="props.data.star" disabled :size="12" />
      <span>
        {{ formatDate(props.data.createdAt, false, "-", true) }}
      </span>
    </div>
    <div class="thumbs">
      <div class="thumb-item" v-for="item in props.data.thumbs">
        <img :src="item" @click="imgScale(item)" alt="" />
      </div>
    </div>
    <div class="content">{{ props.data.content }}</div>
    <Modal :show="state.show" @click.stop="state.show = false">
      <div class="img-scale-container">
        <img :src="state.scaleImg" alt="" />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Comment } from "../../../../types/comment";
import formatDate from "../../../../utils/formatDate";
import StarGroup from "../../../../components/StarGroup.vue";
import Avatar from "../../../../components/Avatar.vue";
import Modal from "../../../../components/Modal.vue";
import userDefaultAvatar from "/src/assets/userDefaultAvatar.jpeg";
import { reactive } from "vue";

interface PropsType {
  data: Comment;
}
const props = defineProps<PropsType>();

const state = reactive({
  show: false,
  scaleImg: "",
});

function imgScale(url: string) {
  state.show = true;
  state.scaleImg = url;
}
</script>

<style scoped lang="less">
.each-comment-container {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 5px solid #ccc;
  padding-bottom: 10px;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avatar {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .username {
      margin: 0px 20px;
    }
    span {
      margin: 0px 20px;
    }
  }
  .thumbs {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    .thumb-item {
      width: 100px;
      height: 80px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        &:hover {
          cursor: pointer;
          transform: scale(1.4);
        }
      }
    }
  }
}

.img-scale-container {
  padding: 100px;
  background-color: #fff;
}
</style>
