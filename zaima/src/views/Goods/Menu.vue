<template>
  <div class="menu-container">
    <RouterLink class="menu-item" :to="{ name: 'Profile' }"
      >商品介绍</RouterLink
    >
    <RouterLink class="menu-item" :to="{ name: 'PackAndPrice' }"
      >规格与包装</RouterLink
    >
    <RouterLink class="menu-item" :to="{ name: 'AfterSale' }"
      >售后保障</RouterLink
    >
    <RouterLink class="menu-item" :to="{ name: 'Comment' }"
      >商品评价({{ props.commentCount }})
    </RouterLink>
    <RouterLink class="menu-item" :to="{ name: 'Discussion' }"
      >讨论区
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
interface PropTypes {
  commentCount: number;
}

const props = withDefaults(defineProps<PropTypes>(), {
  commentCount: 0,
});
</script>

<style scoped lang="less">
.menu-container {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  border-bottom: 2px solid @baseColor;

  .menu-item {
    padding: 10px 15px;

    &.router-link-exact-active {
      background-color: @baseColor !important;
      color: #fff !important;
    }
  }
}
</style>
