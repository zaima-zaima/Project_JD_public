<template>
  <div class="pay-select-container">
    <div class="title">
      <div class="text">请选择付款方式</div>
    </div>
    <div class="paySelect">
      <label>
        在线支付
        <input
          type="radio"
          value="online"
          v-model="state.payment"
          :checked="state.payment === 'online'"
          name="payment"
        />
      </label>
      <label>
        {{ `白条支付 \n(¥ ${store.state.user && store.state.user.baitiao})` }}

        <input
          type="radio"
          value="baitiao"
          :checked="state.payment === 'baitiao'"
          v-model="state.payment"
          name="payment"
          :disabled="store.state.user.baitiao < +props.order.goods.price"
        />
      </label>
    </div>
    <div class="tip" v-if="store.state.user.baitiao < +props.order.goods.price">
      当前无法使用白条服务，因为当前额度不足以支付此订单
    </div>
    <div class="footer">
      <div class="confirm" @click="confirm">确定</div>
      <div class="cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { Order } from "../../../../../types/order";

const store = useStore();

interface PropsType {
  order: Order;
}

const props = defineProps<PropsType>();

const emits = defineEmits(["confirm", "cancel"]);

const state = reactive({
  payment: "online",
});

(function () {
  state.payment = props.order.payment;
})();

watchEffect(() => {
  if (
    props.order.payment === "baitiao" &&
    store.state.user &&
    +store.state.user.baitiao < +props.order.goods.price
  ) {
    state.payment = "online";
  }
});

function confirm() {
  emits("confirm", props.order, state.payment);
}

function cancel() {
  emits("cancel");
}
</script>

<style scoped lang="less">
.pay-select-container {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  .paySelect {
    margin-top: 30px;
    display: flex;
    label {
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      cursor: pointer;
      margin-left: 30px;
    }
  }
  .tip {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: @baseColor;
  }
  .footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    left: 0;
    box-sizing: border-box;
    padding: 10px 20px;
    .confirm,
    .cancel {
      width: 100px;
      height: 40px;
      background-color: @baseColor;
      margin: 10px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
