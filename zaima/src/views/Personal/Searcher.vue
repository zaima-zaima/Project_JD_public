<template>
  <div class="searcher">
    <input type="text" />
    <div class="search">搜索</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.searcher {
  width: 200px;
  height: 30px;
  display: flex;
  box-sizing: border-box;
  border: 1px solid @baseColor;
  input {
    flex: 1 1 auto;
    height: 100%;
    border: none;
    outline: none;
  }
  .search {
    width: 50px;
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @baseColor;
    cursor: pointer;
  }
}
</style>
