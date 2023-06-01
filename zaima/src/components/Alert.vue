<template>
  <div class="alert-container">
    <div class="title">{{ props.title }}</div>
    <div class="content">{{ props.text }}</div>
    <div class="footer">
      <div
        class="cancel pointer hover-base"
        v-if="props.alert === false"
        @click="cancel"
      >
        取消
      </div>
      <div class="comfirm pointer" @click="comfirm">确认</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PropTypes {
  title: string;
  text: string;
  alert?: boolean;
}

const props = withDefaults(defineProps<PropTypes>(), {
  title: "提示",
});
const emits = defineEmits(["comfirm", "cancel"]);

function comfirm() {
  emits("comfirm");
}

function cancel() {
  emits("cancel");
}
</script>

<style scoped lang="less">
.alert-container {
  width: 400px;
  height: 300px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0px 10px;
  position: relative;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;

    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  .content {
    width: 100%;
    color: #000;
    font-size: 16px;
    line-height: 1.3em;
    text-align: left;
  }
  .footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    .comfirm {
      width: 60px;
      height: 30px;
      background-color: @baseColor;
      color: #fff;
      margin-left: 20px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
