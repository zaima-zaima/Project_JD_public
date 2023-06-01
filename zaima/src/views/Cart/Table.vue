<template>
  <div class="table-container">
    <div class="title">
      <div class="total">全部商品 {{ store.state.cart.length }}</div>
    </div>
    <table v-if="store.state.cart.length !== 0">
      <tr class="title">
        <th class="selectAll">
          <input
            type="checkbox"
            :checked="
              store.state.cart.length === store.state.cartSelected.length
            "
            @change="changeAllStatus"
          />
          <span class="text">全选</span>
        </th>
        <th>商品</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
        <th>操作</th>
      </tr>
      <tr class="item" v-for="item in (store.state.cart as Cart[])">
        <div class="store-name">京东官方旗舰店（fake）</div>
        <div class="desc">
          <td>
            <input
              type="checkbox"
              @change="changeStatus(item)"
              :checked="item.selected"
            />
          </td>
          <td>
            <div class="thumb">
              <img :src="item.thumbs[0]" alt="" />
            </div>
            <div class="title">{{ item.name }}</div>
          </td>
          <td>¥{{ item.price }}</td>
          <td>
            <Count :item="item" />
          </td>
          <td>¥{{ (+item.price * item.cartCount).toFixed(2) }}</td>
          <td>
            <span class="base pointer" @click="deleteItem(item)">删除</span>
          </td>
        </div>
      </tr>
    </table>
    <div class="footer" v-if="store.state.cart.length !== 0">
      <div class="left">
        <div class="selectAll">
          <input
            :checked="
              store.state.cart.length === store.state.cartSelected.length
            "
            type="checkbox"
            @change="changeAllStatus"
          />
          <span class="text">全选</span>
        </div>
        <div
          class="deleteSelected hover-base pointer"
          @click="deleteSelectedShow"
        >
          删除选择的商品
        </div>
        <div class="clear hover-base pointer" @click="clearCartModal">
          清空购物车
        </div>
      </div>
      <div class="right">
        <div class="selectedCount">
          已选择{{ store.state.cartSelected.length }}件商品
        </div>
        <div class="total">¥ {{ total.toFixed(2) }}</div>
        <div
          class="sumbit center pointer"
          :class="{ disabled: store.state.cartSelected.length <= 0 }"
          @click="checkout"
        >
          结算
        </div>
      </div>
    </div>
    <div class="cart-empty" v-else>
      <Icon :type="StyleType.cartEmpty" :size="60" />
      <span>当前购物车为空</span>
    </div>
    <Modal :show="state.show">
      <Alert
        :text="state.text"
        @cancel="state.show = false"
        @comfirm="comfirmDelete"
      ></Alert>
    </Modal>

    <Modal :show="state.deleteAllShow">
      <Alert
        :text="state.text"
        @cancel="state.deleteAllShow = false"
        @comfirm="deleteAll"
      ></Alert>
    </Modal>

    <Modal :show="state.deleteSelectShow">
      <Alert
        :text="state.text"
        @cancel="state.deleteSelectShow = false"
        @comfirm="deleteSelected"
      ></Alert>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import Icon from "../../components/Icon.vue";
import router from "../../router";
import Cart from "../../types/Cart";
import { StyleType } from "../../types/enum";
import unique from "../../utils/unique";
import Count from "../../components/Count.vue";
import Modal from "../../components/Modal.vue";
import Alert from "../../components/Alert.vue";
import { deleteCart } from "../../utils/setCart";
import { eliminate } from "../../utils/array";

const store = useStore();

const state = reactive({
  show: false,
  deleteAllShow: false,
  deleteSelectShow: false,
  text: "",
  item: {} as Cart,
});

const total = computed(() => {
  return store.state.cartSelected.reduce(
    (prev: number, next: Cart) => prev + next.cartCount * +next.price,
    0
  );
});

function changeStatus(item: Cart) {
  item.selected = !item.selected;
  const array = [...store.state.cart, item];

  store.dispatch("cartSetup", unique(array));
}

function changeAllStatus(event: any) {
  let array;
  if (event.target.checked) {
    array = store.state.cart.map((item: Cart) => {
      item.selected = true;
      return item;
    });
  } else {
    array = store.state.cart.map((item: Cart) => {
      item.selected = false;
      return item;
    });
  }
  store.dispatch("cartSetup", unique(array));
}

function checkout() {
  if (store.state.cartSelected.length === 0) {
    return;
  }

  router.push({
    name: "CashDesk",
  });
}

function deleteItem(item: Cart) {
  state.show = true;
  state.text = `确定要将${item.name}从购物车中移除吗？`;
  state.item = item;
}

async function comfirmDelete() {
  await deleteCart(state.item);
  state.show = false;
}

function clearCartModal() {
  state.deleteAllShow = true;
  state.text = "确认将购物车清空吗？";
}

async function deleteAll() {
  await store.dispatch("cartSetup", []);
  state.deleteAllShow = false;
}

function deleteSelectedShow() {
  state.deleteSelectShow = true;
  state.text = "确定要删除所选的商品吗？";
}

async function deleteSelected() {
  const array = eliminate(store.state.cart, store.state.cartSelected);
  await store.dispatch("cartSetup", array);
  state.deleteSelectShow = false;
}
</script>

<style scoped lang="less">
.table-container {
  width: 100%;

  .cart-empty {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-size: 30px;
    }
  }
  .title {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  table {
    width: 100%;
    & > .title {
      width: 100%;
      height: 50px;
      background-color: rgb(244, 240, 240);
      padding: 10px;
      box-sizing: border-box;
    }
    tr,
    th,
    td {
      height: 40px;
      display: flex;
      align-items: center;
    }
    th,
    td {
      &:nth-of-type(1),
      &:nth-of-type(3),
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6) {
        flex: 0 0 10%;
      }
      &:nth-of-type(2) {
        flex: 0 0 50%;
      }
    }
    .item {
      display: contents;
      td {
        height: 100px;
      }
      .thumb {
        width: 100px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        display: flex;
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        padding: 10px;
      }
      .store-name {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 5px solid @border;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    height: 60px;
    border: 1px solid @border;
    box-sizing: border-box;
    padding: 10px;
    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      .total {
        margin: 0px 20px;
        font-size: 25px;
        color: @baseColor;
        font-weight: bold;
      }
      .sumbit {
        width: 130px;
        height: 100%;
        background-color: @baseColor;
        color: #fff;
        font-size: 20px;
        &.disabled {
          background-color: #ccc;
        }
      }
    }
  }
}

.selectAll,
.deleteSelected {
  display: flex;
  margin-right: 10px;
  align-items: center;
  margin-right: 10px;
  .text {
    margin-left: 5px;
  }
}
</style>
