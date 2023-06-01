<template>
  <div class="goods-container">
    <div class="thumb" v-if="props.data.thumbs.length >= 1">
      <img :src="props.data.thumbs[0]" alt="" />
    </div>
    <div class="goods-info">
      <div class="price">￥{{ props.data.price }}</div>
      <div class="goods-name hover-base">
        {{ props.data.name }}
      </div>
      <div class="comment">
        <span>{{ props.data.comment }} </span>条评价
      </div>
      <div class="store-name">
        <div class="name">京东官方旗舰店</div>
        <div class="icon">
          <Icon :type="StyleType.chat" />
        </div>
      </div>
      <div class="tags">
        <span class="tag-item" v-for="item in props.data.tags">{{ item }}</span>
      </div>
      <div class="footer">
        <div class="like" @click.stop="flowing">
          <Icon :type="StyleType.chat" />
          <span class="hover-base">关注</span>
        </div>
        <div
          class="cart hover-base"
          :class="{ disabled: +props.data.store <= 0 }"
          @click.stop="cartSetup"
        >
          <Icon :type="StyleType.cartFiled" :size="30" />
          <div class="badge" v-if="state.current.cartCount">
            {{ state.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Goods } from "../types/Goods";
import Icon from "./Icon.vue";
import { StyleType } from "../types/enum";
import { reactive, watchEffect } from "vue";
import setCart from "../utils/setCart";
import { useStore } from "vuex";
import Cart from "../types/Cart";
interface PropTypes {
  data: Goods;
}

const props = defineProps<PropTypes>();
const store = useStore();

const state = reactive({
  count: 0,
  current: {} as Cart,
});

function getCurrentCount() {
  const current = store.state.cart.filter(
    (ele: Cart) => ele.id === props.data.id
  ) as Cart[];

  if (current.length !== 0) {
    state.current = current[0];
    return current[0].cartCount;
  }
  return 0;
}

watchEffect(() => {
  state.count = getCurrentCount();
});

function cartSetup() {
  if (+props.data.store - state.count <= 0) {
    return;
  }

  setCart(props.data, getCurrentCount() + 1);
}

function flowing() {
  return;
}
</script>

<style scoped lang="less">
.goods-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .thumb {
    width: 100%;
    height: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;

    .price {
      width: 100%;
      height: 50px;
      font-size: 30px;
      color: @baseColor;
      font-weight: bold;
    }

    .goods-name {
      width: 100%;
      height: 35px;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: calc(35px / 2);
    }

    .comment {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }

    .store-name {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;

      .name {
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1 1 auto;
      }

      .icon {
        width: 60px;
      }
    }

    .tags {
      width: 100%;
      height: 30px;
      display: flex;

      .tag-item {
        margin: 0 5px;
        box-sizing: border-box;
        padding: 3px 5px;
        border-radius: 5px;
        color: #fff;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @baseColor;
        line-height: 20px;
      }
    }

    .footer {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cart {
        position: relative;
        &.disabled {
          &:hover {
            color: #ccc !important;
          }
        }
        .badge {
          min-width: 20px;
          height: 16px;
          border-radius: 30px;
          background-color: @baseColor;
          color: #fff;
          position: absolute;
          right: -5px;
          top: -10px;
          text-align: center;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
