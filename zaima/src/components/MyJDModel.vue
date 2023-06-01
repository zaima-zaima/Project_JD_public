<template>
  <div class="my-jd-container">
    <div class="order-container">
      <div class="item hover-base watting-list pointer">
        待处理订单 <span class="counter">{{ 0 }}</span>
      </div>
      <div class="item hover-base my-anser pointer">
        我的问答 <span class="counter">{{ 0 }}</span>
      </div>
      <div class="item hover-base decrase-goods pointer">
        降价商品 <span class="counter">{{ 0 }}</span>
      </div>
      <div class="item hover-base return-back pointer">返修退换货</div>
      <div class="item hover-base watching pointer">我的关注</div>
    </div>
    <div class="account-ticket">
      <div class="item hover-base dou pointer">我的京豆</div>
      <div class="item hover-base off-price pointer">
        我的优惠券 <span class="counter">{{ 0 }}</span>
      </div>
      <div class="item hover-base baitiao pointer">京东白条</div>
      <div class="item hover-base licai pointer">我的理财</div>
    </div>
    <div class="sale-help">
      <div class="item hover-base dou pointer">帮助中心</div>
      <div class="item hover-base off-price pointer">售后服务</div>
      <div class="item hover-base baitiao pointer">在线客服</div>
      <div class="item hover-base licai pointer">意见建议</div>
      <div class="item hover-base licai pointer">电话客服</div>
      <div class="item hover-base licai pointer">客服邮箱</div>
      <div class="item hover-base licai pointer">金融咨询</div>
      <div class="item hover-base licai pointer">全球售客服</div>
      <div class="item hover-base licai pointer">企业客服</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.my-jd-container {
  width: 300px;
  height: 260px;
  box-sizing: border-box;
  padding: 15px;
  justify-self: flex-start;
  .account-ticket {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
  }
  .account-ticket,
  .sale-help,
  .order-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .item {
      width: 70px;
      text-align: left;
      margin-right: 10px;
      margin-bottom: 10px;
      .counter {
        color: @baseColor;
      }
    }
  }
}
</style>
