<template>
  <div class="personal-page-container">
    <div class="user">
      <User />
    </div>
    <div class="news">
      <News />
    </div>
    <div class="funcMenu">
      <FuncMenu />
    </div>
  </div>
</template>

<script lang="ts" setup>
import User from "./User.vue";
import News from "./News.vue";
import FuncMenu from "./FuncMenu.vue";
</script>

<style scoped lang="less">
.personal-page-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .user {
    width: 100%;
    height: 80px;
    // background-color: #f70202;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .news {
    width: 100%;
    // height: 110px;
    // background:red;
    margin-top: 10px;
  }
  .funcMenu {
    flex: 1;
    margin-top: 10px;
    // background-color: #fd079f;
  }
}
</style>
