<template>
  <div class="submiting-container">
    <Loading
      :size="200"
      text="订单提交中..."
      v-if="props.status === 'pending'"
    />
    <Result
      v-else
      :status="props.status"
      :payment="props.payment"
      :order="props.order"
    />
  </div>
</template>

<script setup lang="ts">
import Loading from "../../../components/Loading.vue";
import { Order } from "../../../types/order";
import Result from "./result.vue";

type Status = "pending" | "done" | "error";

interface PropsType {
  status: Status;
  order: Order;
  payment: string;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less">
.submiting-container {
  width: 600px;
  height: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
