<template>
  <div class="success-container">
    <div class="success center" v-if="!state.payment">
      <Icon :type="StyleType.cartFiled" :size="60" />
      <span>{{ props.text }}</span>
    </div>
    <div class="payment" v-else>
      <Loading :size="200" text="正在支付..." />
    </div>
    <Modal :show="state.show">
      <PayResult :text="state.text" :status="state.status" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { payGroup } from "../../../api/pay";
import Icon from "../../../components/Icon.vue";
import Loading from "../../../components/Loading.vue";
import { StyleType } from "../../../types/enum";
import { Order } from "../../../types/order";
import filterArray from "../../../utils/filterArray";
import Modal from "../../../components/Modal.vue";
import PayResult from "./PayResult.vue";
interface PropsType {
  text: string;
  order: Order;
  payment: string;
  timer?: 3;
}
const props = defineProps<PropsType>();
const router = useRouter();
const store = useStore();

const state = reactive({
  payment: false,
  show: false,
  status: false,
  text: "",
});

async function payAction() {
  state.status = (await payGroup(props.order)) as unknown as boolean;
  state.show = true;
  if (state.status) {
    state.text = "支付成功";
  } else {
    state.text = "支付失败";
  }

  setTimeout(() => {
    router.push({
      name: "OrderList",
      query: {
        status: "all",
        page: 1,
        limit: 10,
      },
    });
    const cart = filterArray(store.state.cart, store.state.cartSelected);
    store.dispatch("cartSetup", cart);
  }, 2000);
}

setTimeout(() => {
  state.payment = true;
  payAction();
}, 2000);
</script>

<style scoped lang="less">
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(59, 184, 226);
  .success {
    margin-top: 20px;
    color: inherit;
    font-size: inherit;
    flex-direction: column;
    span {
      color: inherit;
      font-size: 30px;
    }
  }
}
</style>
