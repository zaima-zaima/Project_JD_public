<template>
  <div class="playground-container">
    <div class="title">频道广场</div>
    <div class="playground-body">
      <div class="playground-item left">
        <div class="brand">
          <div class="brand-item" v-for="item in props.data.brand">
            <img :src="item.thumb" v-lazy alt="" />
          </div>
        </div>
        <div class="section">
          <div
            class="section-item"
            v-for="item in state.data.section
              ? state.data.section.slice(0, 2)
              : []"
          >
            <Section :data="item" />
          </div>
        </div>
      </div>
      <div class="playground-item right">
        <div class="section">
          <div
            class="section-item"
            v-for="item in state.data.section
              ? state.data.section.slice(2)
              : []"
          >
            <Section :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlayGround } from "../../../../types/playground";
import { reactive, watchEffect } from "vue";
import Section from "./Section.vue";

interface PropsType {
  data: PlayGround;
}
const props = defineProps<PropsType>();

const state = reactive({
  data: {} as PlayGround,
});

watchEffect(() => {
  state.data = props.data;
});
</script>

<style scoped lang="less">
.playground-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    color: #000;
    font-weight: 1200;
  }

  .playground-body {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex: 1;

    .playground-item {
      width: 50%;
      margin: 0px 5px;

      &.left {
        // background-color: #ff0d0d;

        .brand {
          width: 100%;
          height: 70%;
          // background-color: #7a06e6;
          display: flex;

          .brand-item {
            box-sizing: border-box;
            flex: 1;
            padding: 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .section {
          width: 100%;
          height: 30%;
          display: flex;
          box-sizing: border-box;
          padding: 5px;
          // flex-wrap: wrap;

          .section-item {
            margin: 0px 5px;
            width: 50%;
            height: 100%;
            // flex: 0 0 50%;
            box-sizing: border-box;
            padding: 10px;
            background-color: #fff;
          }
        }
      }

      &.right {
        display: flex;
      }

      &.right {
        // background-color: #04fd04;

        .section {
          display: flex;
          flex-wrap: wrap;

          .section-item {
            flex: 0 0 50%;
            height: 33%;
            box-sizing: border-box;
            padding: 5px;
          }
        }
      }
    }
  }
}
</style>
