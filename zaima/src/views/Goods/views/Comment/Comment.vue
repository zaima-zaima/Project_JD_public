<template>
  <div class="comment-container" v-if="state.data.length !== 0">
    <div class="comment-content">
      <Content :data="state.data" />
    </div>
  </div>
  <div class="empty" v-else>
    <Icon :type="StyleType.cartEmpty" :size="60" />
    <span>该商品暂没有任何评论哦！</span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { fetchCommentByGoods } from "../../../../api/comment";
import Icon from "../../../../components/Icon.vue";
import { Comment as CommentType } from "../../../../types/comment";
import { StyleType } from "../../../../types/enum";
import { ResponseWithCount } from "../../../../types/response";
import Content from "./Content.vue";

const route = useRoute();

const state = reactive({
  data: [] as CommentType[],
});

watchEffect(async () => {
  if (route.params.id) {
    const resp = (await fetchCommentByGoods(
      route.params.id as string
    )) as unknown as ResponseWithCount<CommentType>;

    state.data = resp.rows;
  }
});
</script>

<style scoped lang="less">
.comment-container {
  min-height: 600px;
}

.empty {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  span {
    font-size: inherit;
  }
}
</style>
