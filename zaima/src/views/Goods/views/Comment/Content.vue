<template>
  <div class="comment-content">
    <div class="comment-item" v-for="item in props.data">
      <EachComment :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment } from "../../../../types/comment";
import EachComment from "./EachComment.vue";

interface PropsType {
  data: Comment[];
}
const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.comment-content {
  width: 100%;
  .comment-item {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
