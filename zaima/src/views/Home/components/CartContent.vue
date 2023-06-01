<template>
  <div class="cart-content-container">
    <div class="category" v-if="store.state.cart.length !== 0">
      购物品类 {{ store.state.cart.length }}
    </div>
    <div class="cart-content" v-if="store.state.cart.length !== 0">
      <div class="cart-item" v-for="item in (store.state.cart as Cart[])">
        <div class="cart-item-thumb">
          <img :src="item.thumbs[0]" alt="" />
        </div>
        <div class="cart-desc">
          <div class="title">{{ item.name }}</div>
          <div class="count_nums">
            <div class="count">
              <span class="price base"> ¥ {{ item.price }}</span>
              <Count :item="item" />
            </div>
          </div>
        </div>
      </div>
      <div class="cart-total">
        <span class="base">总计：¥ {{ total }}</span>
        <div class="goCart" @click="goCart">去购物车</div>
      </div>
    </div>
    <div class="cart-empty" v-else>
      <Icon :type="StyleType.cartEmpty" :size="60" />
      <span>当前购物车为空</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Count from "../../../components/Count.vue";
import Icon from "../../../components/Icon.vue";
import Cart from "../../../types/Cart";
import { StyleType } from "../../../types/enum";
import unique from "../../../utils/unique";

const store = useStore();
const router = useRouter();

function decrease(item: Cart) {
  if (item.cartCount > 1) {
    item.cartCount--;
    const cart = [...store.state.cart, { ...item }];
    store.dispatch("cartSetup", unique(cart));
  }
}

function increase(item: Cart) {
  if (item.cartCount < +item.store) {
    item.cartCount++;
    const cart = [...store.state.cart, { ...item }];
    store.dispatch("cartSetup", unique(cart));
  }
}

const total = computed(() => {
  const money = store.state.cart.reduce(
    (prev: number, next: Cart) => prev + next.cartCount * +next.price,
    0
  );
  return money.toFixed(2);
});

function goCart() {
  router.push({
    name: "Cart",
  });
}
</script>

<style scoped lang="less">
.cart-content-container {
  margin-top: 10px;
  .cart-empty {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cart-content {
    width: 100%;
    margin-top: 20px;
    .cart-item {
      width: 100%;
      height: 80px;
      display: flex;
      background: rgb(236, 231, 231);
      align-items: center;
      margin-top: 10px;
      .cart-item-thumb {
        width: 100px;
        height: 80px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cart-desc {
        flex: 1 1 auto;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        .title {
          width: 100%;
          height: 40px;
          line-height: 20px;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .count_nums {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .count {
            display: flex;
            .price {
              margin-right: 20px;
            }
          }
        }
      }
    }
    .cart-total {
      box-sizing: border-box;
      padding: 30px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 20px;
      }
      .goCart {
        width: 100px;
        height: 40px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        background-color: @baseColor;
      }
    }
  }
}
</style>
