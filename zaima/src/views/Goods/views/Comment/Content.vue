<template>
  <div class="comment-content">
    <div class="comment-item" v-for="item in props.data">
      <EachComment :data="item" />
    </div>
    <Pager
      :total="props.total"
      :page="props.page"
      :limit="limit"
      @change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { Comment } from "../../../../types/comment";
import EachComment from "./EachComment.vue";
import Pager from "../../../../components/Pager/index.vue";

interface PropsType {
  data: Comment[];
  total: number;
  page: number;
  limit: number;
}
const props = defineProps<PropsType>();
const emits = defineEmits(["change"]);

function changePage(newPage: number) {
  emits("change", newPage);
}
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
