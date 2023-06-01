<template>
  <div class="table-container">
    <div class="header">
      <div class="header-title">
        <div class="order-date"><span>全部订单</span></div>
        <div class="title">订单详情</div>
      </div>
      <div class="deliver-name">收货人</div>
      <div class="total">金额</div>
      <div class="status">状态</div>
      <div class="action">操作</div>
    </div>
    <div class="detail-box" v-if="props.list.length !== 0">
      <div class="detail-item" v-for="item in props.list">
        <div class="detail-title">
          <span>{{ formatDate(item.createdAt, false, "-", true) }}</span>
          <span>订单号 {{ item.id }}</span>
          <div class="store">
            <Icon :type="StyleType.store" :size="20" /><span>京东自营店</span>
          </div>
        </div>
        <div class="detail-content">
          <div class="goods-container">
            <div class="goods">
              <div class="thumb">
                <img :src="item.goods && item.goods.thumbs[0]" alt="" />
              </div>
              <div class="title" @click="goGoods(item.goods)">
                {{ item.goods && item.goods.name }}
              </div>
              <div class="count center">X {{ item.count }}</div>
            </div>
          </div>
          <div class="detail-deliver">{{ item.deliverName }}</div>
          <div class="detail-total">
            <div class="money">
              ¥{{
                item.goods &&
                item.count &&
                (+item.goods.price * item.count).toFixed(2)
              }}
            </div>
            <span>---------------</span>
            <p>{{ item.payment === "online" ? "在线支付" : "白条支付" }}</p>
          </div>
          <div class="detail-status">
            <div class="status">
              {{
                item.status === OrderStatus.pending
                  ? "待付款"
                  : item.status === OrderStatus.paid
                  ? "待发货"
                  : item.status === OrderStatus.deliver
                  ? "待收货"
                  : item.status === OrderStatus.cancel
                  ? "已取消"
                  : "已完成"
              }}
            </div>
          </div>
          <div class="detail-action">
            <div class="action">
              <div class="action-item">
                <div
                  class="button center pointer"
                  v-if="item.status === OrderStatus.pending"
                  @click="goPay(item)"
                >
                  去付款
                </div>
                <div
                  class="button center pointer"
                  v-if="item.status === OrderStatus.deliver"
                  @click="changeStatus(OrderStatus.done, item)"
                >
                  确认收货
                </div>
                <div
                  class="button center pointer"
                  v-if="item.status === OrderStatus.done"
                  @click="goComment(item)"
                >
                  去评论
                </div>
                <span
                  class="hover-base pointer"
                  v-if="(item.status !== OrderStatus.complated) && (item.status !== OrderStatus.done as any) && (item.status !== OrderStatus.cancel as any)"
                  @click="cancelOrder(item)"
                  >取消订单</span
                >
                <span class="hover-base pointer" @click="goDetail(item)"
                  >查看详情</span
                >
                <span
                  class="pointer hover-base"
                  @click="openPushCartModal(item)"
                  >{{
                    item.status === OrderStatus.cancel
                      ? "放入购物车"
                      : "再来一单"
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal :show="state.pushToCart.show">
      <Alert
        :text="state.pushToCart.text"
        @cancel="state.pushToCart.show = false"
        @comfirm="pushToCart"
      />
    </Modal>

    <Modal :show="state.changeStatus.show">
      <Alert
        :text="state.changeStatus.text"
        @cancel="state.changeStatus.show = false"
        @comfirm="comfirmDeliver"
      />
    </Modal>

    <Modal :show="state.cancelShow">
      <Alert
        :text="state.changeStatus.text"
        @cancel="cancelModalCancelOrder"
        @comfirm="comfirmCancelOrder"
      />
    </Modal>

    <Modal :show="state.comments.show">
      <Comment
        :order="state.comments.current"
        @close="state.comments.show = false"
        @submit="submitComment"
      />
    </Modal>
    <modal :show="state.shoosePay">
      <PaySelect :order="state.current" @confirm="confirm" @cancel="cancel" />
    </modal>

    <Modal :show="state.modal">
      <div class="loading">
        <Loading :size="200" v-if="state.loading" text="支付中" />
        <div class="result success" v-if="state.payResult === 'success'">
          <Icon :type="StyleType.chat" :size="60" />
          <span>支付成功</span>
        </div>
        <div class="result failed" v-else-if="state.payResult === 'failed'">
          <Icon :type="StyleType.chat" :size="60" />
          <span>支付失败</span>
        </div>
      </div>
    </Modal>

    <Modal :show="state.cancelModal">
      <div class="loading">
        <Loading text="取消订单中" :size="300" />
      </div>
    </Modal>

    <Modal :show="state.pushToCart.pushRes">
      <Alert
        alert
        text="加入成功"
        @comfirm="state.pushToCart.pushRes = false"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { pay } from "../../../../../api/pay";
import Icon from "../../../../../components/Icon.vue";
import { StyleType } from "../../../../../types/enum";
import { Order, OrderStatus } from "../../../../../types/order";
import formatDate from "../../../../../utils/formatDate";
import Modal from "../../../../../components/Modal.vue";
import { reactive } from "vue";
import Loading from "../../../../../components/Loading.vue";
import { useRouter } from "vue-router";
import Alert from "../../../../../components/Alert.vue";
import Comment from "./Comment.vue";
import { Comment as CommentType } from "../../../../../types/comment";
import PaySelect from "./PaySelect.vue";
import { useStore } from "vuex";
import { Goods } from "../../../../../types/Goods";
import setCart from "../../../../../utils/setCart";

interface PropsType {
  list: Order[];
}

const props = defineProps<PropsType>();

const state = reactive({
  modal: false,
  loading: false,
  payResult: "",
  oid: "",
  cancelShow: false,
  cancelModal: false,
  changeStatus: {
    status: "",
    orderId: "",
    show: false,
    text: "",
  },
  comments: {
    show: false,
    current: {} as Order,
  },
  pushToCart: {
    show: false,
    text: "",
    push: { count: 0, goods: {} as Goods },
    pushRes: false,
  },
  current: {} as Order,
  shoosePay: false,
});

const store = useStore();

const router = useRouter();
const emits = defineEmits([
  "payStatus",
  "changeDeliverStatus",
  "submitComment",
]);

async function goPay(item: Order) {
  state.current = item;
  state.shoosePay = true;
}

function goDetail(item: Order) {
  router.push({
    name: "OrderDetail",
    query: {
      oid: item.id,
    },
  });
}

async function confirm(order: Order, payment: any) {
  state.modal = true;
  state.loading = true;
  const resp = (await pay({
    oid: order.id as string,
    paymentMethod: payment,
    user: store.state.user.id as string,
  })) as any;

  state.oid = order.id as string;
  state.loading = false;
  if (resp && !resp.code) {
    state.payResult = "success";
  } else {
    state.payResult = "failed";
  }

  emits("payStatus", resp && !resp.code ? true : false, state.oid);

  setTimeout(() => {
    state.modal = false;
    state.payResult = "";
    state.oid = "";
    state.shoosePay = false;
  }, 2000);
}

function cancel() {
  state.shoosePay = false;
  state.modal = false;
}

function changeStatus(status: OrderStatus, item: Order) {
  state.changeStatus.orderId = item.id as string;
  state.changeStatus.status = status;
  state.changeStatus.show = true;
  state.changeStatus.text = `确认对 ${item.goods.name} 进行收货操作吗？`;
}

function comfirmDeliver() {
  emits(
    "changeDeliverStatus",
    state.changeStatus.orderId,
    state.changeStatus.status,
    () => {
      state.changeStatus.show = false;
    }
  );
}

function goComment(item: Order) {
  state.comments.show = true;
  state.comments.current = item;
}

function submitComment(comment: CommentType) {
  emits("submitComment", comment, () => {
    state.comments.show = false;
  });
}

function cancelOrder(item: Order) {
  state.cancelShow = true;
  state.changeStatus.text = "确认要取消订单吗？";
  if (item.payment === "baitiao") {
    state.changeStatus.text =
      state.changeStatus.text +
      ` （该订单为白条支付，订单取消后白条额度将退回到您的账户中）`;
  }
  state.changeStatus.orderId = item.id as string;
}

function cancelModalCancelOrder() {
  state.cancelShow = false;
  state.changeStatus.orderId = "";
  state.changeStatus.text = "";
}

async function comfirmCancelOrder() {
  state.cancelModal = true;
  emits("changeDeliverStatus", state.changeStatus.orderId, "cancel", () => {
    state.cancelModal = false;
    state.cancelShow = false;
  });
  return;
}

function goGoods(goods: Goods) {
  router.push({
    name: "Profile",
    params: {
      id: goods.id,
    },
  });
}

function openPushCartModal(order: Order) {
  state.pushToCart.show = true;
  state.pushToCart.text = `确认要将 ${order.goods.name} 重新加入到购物车吗？`;
  state.pushToCart.push.count = order.count;
  state.pushToCart.push.goods = order.goods;
}

function pushToCart() {
  setCart(state.pushToCart.push.goods, state.pushToCart.push.count);
  state.pushToCart.show = false;
  state.pushToCart.pushRes = true;
}
</script>

<style scoped lang="less">
.table-container {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
  .header {
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    background-color: #f8f3f3;
    .header-title,
    .goods-container {
      display: flex;
      flex: 0 0 60%;
      box-sizing: border-box;
      padding-left: 10px;
      .title {
        margin-left: auto;
        margin-right: auto;
      }
    }
    .deliver-name,
    .total,
    .status,
    .action {
      text-align: center;
      flex: 0 0 10%;
    }
  }
  .detail-box {
    margin-top: 10px;
    .detail-item {
      width: 100%;
      margin-top: 15px;
      background-color: #efebeb;
      .detail-title {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        > span {
          margin: 0px 30px;
        }
      }
      .detail-content {
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #f1eeee;
        border-top: none;
        width: 100%;
        height: 160px;
        display: flex;
        align-items: center;
        background-color: #fff;
        .goods-container {
          width: 100%;
          display: flex;
          flex: 0 0 60%;
          box-sizing: border-box;
          padding-left: 10px;
          .goods {
            width: 100%;
            display: flex;
            align-items: center;
            .title {
              width: 300px;
              margin: 10px;
              -webkit-line-clamp: 2;
              overflow: hidden;
              height: 40px;
              line-height: 20px;
              text-overflow: hidden;
              &:hover {
                color: @baseColor;
                cursor: pointer;
                text-decoration: underline;
              }
            }
            .thumb {
              width: 80px;
              height: 60px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .count {
              height: 100%;
              width: 200px;
            }
          }
        }
        .detail-deliver,
        .detail-total,
        .detail-status,
        .detail-action {
          text-align: center;
          flex: 0 0 10%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .action {
            width: 100%;
            height: 100%;
            .action-item {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .button {
                width: 60px;
                height: 25px;
                color: #fff;
                background-color: @baseColor;
              }

              span {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}

.loading {
  width: 600px;
  height: 400px;
  background-color: #fff;
  z-index: 200;
  position: absolute;
  .result {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    span {
      font-size: inherit;
      margin-top: 20px;
      color: inherit;
    }

    &.success {
      color: rgb(50, 218, 7);
    }
    &.failed {
      color: red;
    }
  }
}
</style>
