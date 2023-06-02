<template>
  <div class="thumb-container">
    <div class="big-thumb">
      <img :src="props.thumbs && props.thumbs[state.index]" v-lazy alt="" />
    </div>
    <div class="thumbs-scroll">
      <div
        class="thumb-item pointer"
        @mouseenter="changeIndex(index)"
        v-for="(item, index) in props.thumbs"
      >
        <img :src="item" v-lazy alt="" />
      </div>
    </div>
    <div class="footer">
      <div class="collect pointer hover-base">
        <Icon :type="StyleType.star" :size="18" />
        <span>收藏</span>
      </div>
      <span class="report pointer hover-base">举报</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
interface PropTypes {
  thumbs: string[];
}

const state = reactive({
  index: 0,
});

const props = defineProps<PropTypes>();

function changeIndex(index: number) {
  state.index = index;
}
</script>

<style scoped lang="less">
.thumb-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .big-thumb {
    width: 100%;
    height: 330px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .thumbs-scroll {
    width: 100%;
    height: 70px;
    // background-color: palegoldenrod;
    display: flex;
    align-items: center;

    .thumb-item {
      width: 50px;
      height: 50px;
      margin: 0 5px;

      img {
        width: 100%;
        height: 100%;
        &:hover {
          transform: scale(1.4);
        }
      }
    }
  }

  .footer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 5px;

    .collect {
      display: flex;
      align-items: center;
    }

    span {
      color: inherit;
    }

    .report {
      &:hover {
        color: @baseColor;
      }
    }
  }
}
</style>
