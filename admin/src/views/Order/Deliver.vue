<template>
  <div class="deliver-container">
    <div class="title">发货</div>
    <div class="descrition">发货前请仔细核对该订单信息</div>
    <div class="goods-content">
      <div class="thumb">
        <img :src="props.data.goods.thumbs[0]" alt="" />
      </div>
      <div class="goods">{{ props.data.goods.name }}</div>
    </div>
    <div class="deliver-name deliver-item">
      收货人：{{ props.data.deliverName }}
    </div>
    <div class="deliver-phone deliver-item">
      联系电话: {{ props.data.deliverPhone }}
    </div>
    <div class="deliver-address deliver-item">
      收货地址:
      {{
        props.data.deliverAddress.province +
        props.data.deliverAddress.city +
        (props.data.deliverAddress.area || "") +
        props.data.deliverAddress.detail
      }}
    </div>
    <div class="deliver-submit">
      <div class="order-no">
        <h5>快递单号：</h5>
        <div class="input">
          <el-input v-model="state.deliverNo" @input="state.error = ''" />
        </div>

        <span class="error" v-if="state.error">{{ state.error }}</span>
      </div>
      <div class="order-button">
        <el-button type="primary" :loading="state.loading" @click="emitDeliver"
          >发货</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Order } from "../../types/order";

interface PropsType {
  data: Order;
}

const props = defineProps<PropsType>();

const emits = defineEmits(["emit"]);

const state = reactive({
  deliverNo: "",
  loading: false,
  error: "",
});

function emitDeliver() {
  if (!state.deliverNo) {
    state.error = "订单编号不能为空";
    return;
  }

  const reg = /^(\S)([0-9a-zA-Z])+$/g;

  if (!reg.test(state.deliverNo)) {
    state.error = "格式错误！该值只能由数字和字母组成";
    return;
  }

  if (state.deliverNo.length < 5 || state.deliverNo.length > 20) {
    state.error = "该值长度范围为5-20";
    return;
  }

  state.loading = true;
  emits("emit", state.deliverNo, props.data.id, () => {
    state.loading = false;
    state.deliverNo = "";
  });
}
</script>

<style scoped lang="less">
.deliver-container {
  width: 100%;
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 30px;
  }
  .descrition {
    margin: 10px 0px;
    font-weight: bold;
    color: #000;
  }

  .goods-content {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    .thumb {
      width: 60px;
      height: 40px;
      flex-shrink: 0;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods {
    }
  }

  .deliver-submit {
    display: flex;
    height: 40px;
    align-items: center;
    .order-no {
      display: flex;
      flex: 1;
      align-items: center;
      .input {
        width: 300px;
      }
    }
  }

  .deliver-item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
  }
}

.error {
  margin-left: 10px;
  color: red;
}
</style>
