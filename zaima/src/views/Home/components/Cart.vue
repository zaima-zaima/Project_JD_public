<template>
  <div class="cart-inner-container">
    <div class="cart-title">
      <div class="icon">
        <Icon :type="StyleType.cartFiled" :size="30" />
        <div class="badge">
          <span>{{ count }}</span>
        </div>
      </div>
      <div class="title">我的购物车</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Icon from "../../../components/Icon.vue";
import { StyleType } from "../../../types/enum";

const store = useStore();

const count = computed(() => {
  return store.state.cart.reduce(
    (init: number, current: any) => init + current.cartCount,
    0
  );
});
</script>

<style scoped lang="less">
.cart-title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .icon {
    color: @baseColor;
    position: relative;
    .badge {
      width: 20px;
      height: 10px;
      background: red;
      text-align: center;
      line-height: 10px;
      position: absolute;
      border-radius: 10px;
      top: -5px;
      left: 10px;
      span {
        color: aliceblue;
      }
    }
  }
  .title {
    margin-left: 15px;
  }
}
</style>
