<template>
  <div class="goods-detail-container">
    <Menu :commentCount="props.commentCount" />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import Menu from "./Menu.vue";

interface PropsType {
  commentCount: number;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.goods-detail-container {
  width: 100%;
  padding: 10px 20px;
}
</style>
