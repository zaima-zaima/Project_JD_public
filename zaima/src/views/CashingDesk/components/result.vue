<template>
  <div class="result">
    <div class="order-status">
      <Success
        v-if="props.status === 'done'"
        :text="'订单提交成功'"
        :payment="props.payment"
        :order="props.order"
      />
      <Failed v-else text="订单提交失败" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Success from "./Success.vue";
import Failed from "./Failed.vue";
import { Order } from "../../../types/order";

type Status = "pending" | "done" | "error";

interface PropsType {
  status: Status;
  order: Order;
  payment: string;
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="less"></style>
