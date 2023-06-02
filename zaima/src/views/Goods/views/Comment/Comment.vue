<template>
  <div class="comment-container">
    <div class="comment-content">
      <Loading :size="200" v-if="state.loading" />
      <Content
        :data="state.data"
        :total="state.total"
        :page="state.page"
        :limit="state.limit"
        @change="changePage"
        v-else
      />
    </div>
  </div>
  <div class="empty" v-if="state.data.length === 0 && !state.loading">
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
import Loading from "../../../../components/Loading.vue";

const route = useRoute();

const state = reactive({
  data: [] as CommentType[],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,
});

watchEffect(async () => {
  if (route.params.id) {
    state.loading = true;
    const resp = (await fetchCommentByGoods(
      route.params.id as string,
      state.page,
      state.limit
    )) as unknown as ResponseWithCount<CommentType>;
    state.loading = false;
    state.data = resp.rows;
    state.total = resp.count;
  }
});

function changePage(newPage: number) {
  state.page = newPage;
}
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
