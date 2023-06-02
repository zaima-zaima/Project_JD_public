<template>
  <div class="order-info-container">
    <div class="deliver-info">
      <div class="deliver-sign">
        <div class="title">
          <span>收货人信息 </span>
          <div class="deliver-setting hover-base pointer" @click="change">
            更改
          </div>
        </div>
        <div
          class="deliver-info"
          v-if="state.data.length !== 0 && state.default.province"
        >
          <div class="name">
            <span>收货人：{{ state.default && state.default.name }}</span>
          </div>
          <div class="phone">
            <span>手机：{{ state.default && state.default.phone }}</span>
          </div>
          <div class="local">
            <span
              >收货地址：{{
                (state.default.province && state.default.province.name) +
                (state.default.city ? state.default.city.name : "") +
                (state.default.area ? state.default.area.name : "") +
                state.default.detail
              }}</span
            >
          </div>
        </div>
        <div class="deliver-empty" v-else>
          <Icon :type="StyleType.local" :size="50" />
          <span>无收货信息，请先选择/添加</span>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="title">支付方式</div>
      <div class="pay-box">
        <div class="online">
          <label>
            <input
              type="radio"
              name="payment"
              value="online"
              v-model="state.payment"
              id=""
            />在线支付
          </label>
        </div>
        <div class="baitiao">
          <label>
            <input
              type="radio"
              name="payment"
              value="baitiao"
              v-model="state.payment"
              :disabled="
                !store.state.user ||
                (store.state.user && store.state.user.baitiao === null) ||
                +store.state.user.baitiao < +total
              "
              id=""
            />京东白条
          </label>
          <span v-if="store.state.user && store.state.user.baitiao !== null">{{
            `(${store.state.user.baitiao}元)`
          }}</span>
          <span
            class="base"
            v-if="
              store.state.user &&
              store.state.user.baitiao !== null &&
              +store.state.user.baitiao < +total
            "
            >不能使用白条，因为当前额度不足以支付此订单</span
          >
          <span
            class="base"
            v-if="store.state.user && store.state.user.baitiao === null"
            >不能使用白条，因为你暂未开通此服务</span
          >
          <span
            class="goCreate pointer hover-base"
            v-if="store.state.user && store.state.user.baitiao === null"
            @click="state.baitiao = true"
            >去开通</span
          >
        </div>
      </div>
    </div>
    <div class="order-detail">
      <div class="title">订单详情</div>
      <table>
        <tr>
          <th>商品详情</th>
          <th>商品单价</th>
          <th>数量</th>
          <th>价格</th>
        </tr>

        <tr v-for="item in (store.state.cartSelected as Cart[])">
          <td>
            <div class="img">
              <img :src="item.thumbs[0]" alt="" />
            </div>
            <div class="name">{{ item.name }}</div>
          </td>
          <td>¥{{ item.price }}</td>
          <td>{{ item.cartCount }}</td>
          <td>¥{{ (+item.price * item.cartCount).toFixed(2) }}</td>
        </tr>
      </table>
      <div class="total">
        <div class="title">总计:¥ {{ total.toFixed(2) }}</div>
        <div class="right">
          <div class="tip" v-if="state.tip">请选择一个收货地址</div>
          <div class="submitOrder pointer center" @click="orderSubmit">
            {{ state.submiting ? "提交中...." : "提交订单" }}
          </div>
        </div>
      </div>
    </div>
    <Modal :show="state.modalShow">
      <template #default>
        <DeliverManager
          :data="state.data"
          @setDefault="setDefault"
          @cancel="cancelHandle"
          @confirm="confirmHandle"
          @submitSuccess="submitSuccess"
          @delete="removeDeliver"
          :initDefault="state.default"
        />
      </template>
    </Modal>
    <Modal
      :show="
        state.orderStatus === 'done' ||
        state.orderStatus === 'error' ||
        state.orderStatus === 'pending'
      "
    >
      <Submiting
        :status="state.orderStatus"
        :payment="state.payment"
        :order="state.order"
      />
    </Modal>
    <BaiTiaoCreator v-if="state.baitiao" @close="state.baitiao = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import Cart from "../../../types/Cart";
import {
  deleteDeliver,
  fetchDeliver,
  updateDeliver,
} from "../../../api/deliver";
import { Deliver } from "../../../types/Deliver";
import Icon from "../../../components/Icon.vue";
import { StyleType } from "../../../types/enum";
import Modal from "../../../components/Modal.vue";
import DeliverManager from "../../../components/DeliverManager/DeliverManager.vue";
import Submiting from "./submiting.vue";
import { submitOrder } from "../../../api/order";
import { Order } from "../../../types/order";

import BaiTiaoCreator from "../../../components/BaiTiaoCreator.vue";

type Status = "pending" | "done" | "error";

const store = useStore();
const state = reactive({
  default: {} as Deliver,
  data: [] as Deliver[],
  payment: "online",
  modalShow: false,
  orderStatus: "" as Status,
  order: {} as Order,
  tip: false,
  baitiao: false,
  submiting: false,
});

const total = computed(() => {
  return store.state.cartSelected.reduce(
    (prev: number, next: Cart) => prev + next.cartCount * +next.price,
    0
  );
});

watchEffect(async () => {
  if (store.state.user) {
    state.data = (await fetchDeliver(
      store.state.user.id
    )) as unknown as Deliver[];
  }

  const map = state.data.filter((item) => {
    if (item.default) {
      return item;
    }
  });

  if (map.length !== 0) {
    state.default = map[0];
  } else if (state.data.length !== 0) {
    state.default = state.data[0];
  }
});

function submitSuccess(data: Deliver) {
  let array = [] as Deliver[];
  if (data.default) {
    array = state.data.map((item) => {
      item.default = false;
      return item;
    });
    state.data = [data, ...array];
  } else {
    state.data = [data, ...state.data];
  }

  // console.log(state.data);
}

async function setDefault(value: Deliver) {
  let updateData = {} as any;
  updateData = { ...value };
  updateData.default = true;
  updateData.province = value.province.id;
  updateData.city = value.city ? value.city.id : "";
  updateData.area = value.area ? value.area.id : "";

  state.data = (await updateDeliver(
    value.id as string,
    updateData
  )) as unknown as Deliver[];
}

function cancelHandle() {
  state.modalShow = false;
}

function confirmHandle(value: Deliver) {
  state.default = value;
  state.modalShow = false;
  state.tip = false;
}

function change() {
  state.modalShow = true;
}

async function orderSubmit() {
  if (state.submiting) {
    return;
  }

  if (!state.default || !state.default.province) {
    state.tip = true;
    return;
  }

  state.orderStatus = "pending";
  const order = {
    user: store.state.user.id,
    deliverName: state.default.name,
    deliverPhone: state.default.phone,
    deliverAddress: state.default.id,
    payment: state.payment,
    orderList: store.state.cartSelected,
  } as Order;
  const resp = (await submitOrder(order)) as any;
  state.submiting = false;

  if (resp.code && resp.code !== 0) {
    state.orderStatus = "error";
  } else {
    state.order = resp;
    state.orderStatus = "done";
  }
}

async function removeDeliver(deliver: Deliver, callback: Function) {
  await deleteDeliver(deliver.id as string);
  state.data = state.data.filter((data) => deliver.id !== data.id);
  if (state.default && deliver.id === state.default.id) {
    state.default = {} as Deliver;
  }
  callback();
}
</script>

<style scoped lang="less">
.order-info-container {
  margin-top: 10px;
  width: 100%;
  .deliver-info {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .deliver-sign {
      width: 100%;
      .deliver-empty {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          margin-top: 20px;
          font-size: 20px;
        }
      }
    }
  }

  .payment {
    margin-top: 20px;
    .title {
      color: #000;
    }
    .pay-box {
      width: 100%;
      height: 60px;
      // background-color: red;
      margin: 20px 0px;
      display: flex;
      align-items: center;
      .goCreate {
        margin-left: 20px;
        color: #18304b;
      }
      .online {
        margin-right: 20px;
      }
    }
  }

  .order-detail {
    .title {
      color: #000;
    }
  }

  .title {
    width: 100%;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-between;
    span {
      font-weight: bold;
      color: #000;
    }
  }

  .img {
    width: 100px;
    height: 80px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  table {
    th {
      margin-bottom: 10px;
    }
    td {
      background-color: #e9e6e6;
    }
    th:nth-of-type(1),
    td:nth-of-type(1) {
      text-align: center;
      width: 500px;
      display: flex;
    }
    th:nth-of-type(2),
    td:nth-of-type(2) {
      text-align: center;
      width: 100px;
    }
    th:nth-of-type(3),
    td:nth-of-type(3) {
      text-align: center;
      width: 80px;
    }
    th:nth-of-type(4),
    td:nth-of-type(4) {
      text-align: center;
      padding: 0px 20px;
    }
    .name {
      text-align: left;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
  }
  .total {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      .tip {
        flex-shrink: 0;
        margin-right: 20px;
        color: @baseColor;
      }
    }
    .title {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 30px;
      color: @baseColor;
    }
    .submitOrder {
      width: 150px;
      height: 100%;
      background-color: @baseColor;
      font-size: 20px;
      text-align: center;
      line-height: 60px;
      border-radius: 10px;
      color: #fff;
      transition: 1s;
      &:hover {
        background-color: rgb(203, 12, 12);
        color: #e7e1e1;
      }
    }
  }
}
</style>
