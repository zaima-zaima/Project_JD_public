<template>
  <div class="count-container">
    <div class="decrease pointer" @click="decrease(item)">-</div>
    <div class="nums">{{ item.cartCount }}</div>
    <div class="increase pointer" @click="increase(item)">+</div>
  </div>
  <Modal :show="state.show">
    <Alert
      :text="`确定要将${props.item.name}从购物车中移除吗`"
      @cancel="cancelModal"
      @comfirm="comfirmDelete"
    />
  </Modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import store from "../store";
import Cart from "../types/Cart";
import { deleteCart } from "../utils/setCart";
import unique from "../utils/unique";
import Alert from "./Alert.vue";
import Modal from "./Modal.vue";

interface PropTypes {
  item: Cart;
}

const props = defineProps<PropTypes>();

const state = reactive({
  show: false,
});

function decrease(item: Cart) {
  if (item.cartCount > 1) {
    item.cartCount--;
    const cart = [...store.state.cart, { ...item }];
    store.dispatch("cartSetup", unique(cart));
  } else {
    state.show = true;
  }
}

function increase(item: Cart) {
  if (item.cartCount < +item.store) {
    item.cartCount++;
    const cart = [...store.state.cart, { ...item }];
    store.dispatch("cartSetup", unique(cart));
  }
}

function cancelModal() {
  state.show = false;
}

async function comfirmDelete() {
  await deleteCart(props.item);
  state.show = false;
}
</script>

<style scoped lang="less">
.count-container {
  display: flex;
  .price {
    margin-right: 20px;
  }
  .decrease,
  .increase {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: @baseColor;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nums {
    margin: 0px 10px;
  }
}
</style>
