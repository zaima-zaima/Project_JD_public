<template>
  <div class="goods-detail-container" v-if="state.data">
    <div class="banner">
      <Banner />
    </div>
    <div class="store-info">
      <div class="inner">
        <div class="cate">分类信息</div>
        <div class="store flex">
          <div class="store-name m flex">
            <span class="self pointer">自营</span>
            <span class="name hover-base pointer">京东自营旗舰店</span>
          </div>
          <div class="consultion m hover-base pointer flex">
            <div class="icon">
              <Icon :type="StyleType.chat" />
            </div>
            <span>联系客服</span>
          </div>
          <div class="flowing-store hover-base m pointer flex">
            <div class="icon">
              <Icon :type="StyleType.store" :size="16" />
            </div>
            <span>关注店铺</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="body">
        <div class="purchase">
          <div class="thumb">
            <Thumb :thumbs="state.data.thumbs" />
          </div>
          <div class="selection">
            <Selection :data="state.data" :key="store.state.MathRandom" />
          </div>
        </div>
        <div class="production-detail">
          <div class="store-tip">
            <div class="title">
              <span>京东官方旗舰店</span>
              <Icon :type="StyleType.chat" />
            </div>
            <div class="content">
              <div class="v_store">关注店铺</div>
              <div class="v_store">收藏商品</div>
            </div>
          </div>
          <div class="detail">
            <GoodsDetail :commentCount="state.data.comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="empty" v-else>
    <div class="empty-box">
      <Empty text="找不到该商品" :size="60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from "../Home/components/Banner.vue";
import Icon from "../../components/Icon.vue";
import { StyleType } from "../../types/enum";
import { reactive, watchEffect } from "vue";
import { getGoodsById } from "../../api/goods";
import { Goods } from "../../types/Goods";
import { useRoute } from "vue-router";
import Thumb from "./Thumb.vue";
import Selection from "./Selection.vue";
import GoodsDetail from "./GoodsDetail.vue";
import { useStore } from "vuex";
import Empty from "../../components/Empty.vue";
const state = reactive({
  data: {} as Goods,
});

const route = useRoute();
const store = useStore();

watchEffect(async () => {
  state.data = (await getGoodsById(
    route.params.id as string
  )) as unknown as Goods;
  console.log(state.data);
});
</script>

<style scoped lang="less">
.goods-detail-container {
  width: 100%;
  height: 100%;

  .store-info {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1eeee;

    .inner {
      width: 1200px;
      height: 100%;
      // background-color: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      box-sizing: border-box;
    }
  }

  .m {
    margin: 0px 10px;
    box-sizing: border-box;

    span {
      margin: 0px 3px;
    }

    .self {
      padding: 1px;
      background-color: @baseColor;
      color: #fff !important;
    }

    span:not(.name) {
      color: inherit;
    }
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #fff;

    .body {
      width: 1200px;
      padding: 10px;
      box-sizing: border-box;

      .purchase {
        width: 100%;
        height: 600px;
        // background-color: red;
        display: flex;

        .thumb {
          width: 370px;
          height: 430px;
          // background-color: blue;
        }

        .selection {
          flex: 1 1 auto;
          // background-color: palevioletred;
        }
      }

      .production-detail {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;

        .store-tip {
          width: 150px;
          height: fit-content;
          padding: 0px 0px 15px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;

          .title {
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            background-color: #f1eeee;
            box-sizing: border-box;
            padding: 0px 5px;

            span {
              margin-right: 10px;
            }
          }

          .content {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .v_store {
              padding: 10px 20px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              margin-top: 10px;
              cursor: pointer;
              background-color: #e9e0e0;
            }
          }
        }

        .detail {
          flex: 1;
        }
      }
    }
  }
}

.empty {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  .empty-box {
    width: 1200px;
  }
}
</style>
