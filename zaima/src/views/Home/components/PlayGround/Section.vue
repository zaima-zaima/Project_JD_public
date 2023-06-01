<template>
  <div class="section-container">
    <div class="title-container">
      <span class="title">{{ props.data.title }}</span>
      <span class="description">{{ props.data.description }}</span>
    </div>
    <div class="section-box">
      <div class="section-img-container" v-for="item in props.data.childs">
        <img :src="item.thumb" v-lazy alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Section } from "../../../../types/playground";
interface PropsType {
  data: Section;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.section-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .title-container {
    width: 100%;
    height: 30px;
    // background-color: #07bce9;

    .title {
      font-size: 25px;
      line-height: 30px;
      font-weight: bold;
      color: #000;
    }
  }

  .section-box {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    padding: 2px;
    margin-top: 3px;
    height: calc(100% - 30px);

    .section-img-container {
      flex: 1;
      margin: 0px 5px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
