<template>
  <div class="order-table-container">
    <el-table
      :data="props.data"
      style="width: 100%"
      :row-class-name="setClassName"
      v-loading="props.loading"
    >
      <el-table-column
        prop="u"
        v-slot="scope"
        fixed="left"
        label="用户"
        width="180"
      >
        {{ scope.row.u.username }}
      </el-table-column>
      <el-table-column prop="goods" v-slot="scope" label="商品" width="320">
        {{ scope.row.goods.name }}
      </el-table-column>
      <el-table-column prop="price" v-slot="scope" label="单价" width="180">
        ¥ {{ scope.row.goods.price }}
      </el-table-column>
      <el-table-column prop="count" v-slot="scope" label="数量" width="180">
        {{ scope.row.count }}
      </el-table-column>
      <el-table-column prop="" v-slot="scope" label="应付" width="180">
        ¥ {{ (scope.row.goods.price * scope.row.count).toFixed(2) }}
      </el-table-column>
      <el-table-column
        prop="payment"
        v-slot="scope"
        label="支付方式"
        width="180"
      >
        {{ scope.row.payment === "online" ? "在线支付" : "白条支付" }}
      </el-table-column>
      <el-table-column
        prop="status"
        v-slot="scope"
        label="订单状态"
        width="180"
      >
        {{
          scope.row.status === OrderStatus.pending
            ? "未支付，等待用户支付"
            : scope.row.status === OrderStatus.paid
            ? "已支付，待发货"
            : scope.row.status === OrderStatus.deliver
            ? "已发货，等待买家收货"
            : scope.row.status === OrderStatus.done
            ? "已签收，等待评价"
            : "已完成"
        }}
      </el-table-column>
      <el-table-column prop="" v-slot="scope" label="商品来源" width="180">
        {{ scope.row.goods.jdStore ? "京东自营" : "" }}
      </el-table-column>
      <el-table-column prop="deliverName" label="联系人" width="180">
      </el-table-column>
      <el-table-column prop="deliverPhone" label="联系人电话" width="180">
      </el-table-column>
      <el-table-column
        prop="deliverAddress"
        v-slot="scope"
        label="送货地址"
        width="200"
      >
        {{
          scope.row.deliverAddress.province +
          scope.row.deliverAddress.city +
          (scope.row.deliverAddress.area ? scope.row.deliverAddress.area : "") +
          scope.row.deliverAddress.detail
        }}
      </el-table-column>
      <el-table-column
        prop=""
        v-slot="scope"
        label="操作"
        fixed="right"
        width="180"
      >
        <el-button
          type="primary"
          v-if="
            scope.row.status === OrderStatus.paid && scope.row.goods.jdStore
          "
          @click="goDeliver(scope.row)"
          >去发货</el-button
        >
      </el-table-column>
    </el-table>
    <el-dialog v-model="state.show">
      <template #default>
        <Deliver :data="state.current" @emit="setDeliver" />
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Order, OrderStatus } from "../../types/order";
import Deliver from "./Deliver.vue";

interface PropsType {
  data: Order[];
  loading: boolean;
}

const props = defineProps<PropsType>();

const state = reactive({
  show: false,
  current: {} as Order,
});

const emits = defineEmits(["updateOrder"]);

function goDeliver(item: Order) {
  state.show = true;
  state.current = item;
}

function setClassName(row: { row: Order }) {
  console.log(row.row);

  if (row.row.status === OrderStatus.paid) {
    return "paid";
  }
  return "";
}

function setDeliver(deliverId: string, oid: string, callback: Function) {
  emits("updateOrder", deliverId, oid, callback, () => {
    state.show = false;
  });
}
</script>

<style scoped lang="less">
.order-table-container {
  width: 100%;
}
</style>
<style>
.el-table .paid {
  --el-table-tr-bg-color: #d7c1c1 !important;
}
</style>
