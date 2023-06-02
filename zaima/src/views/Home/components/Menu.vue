<template>
  <div class="menu-container">
    <div class="list" v-for="navItem in data">
      <span v-for="(item, index) in navItem">
        {{ item }} {{ index === navItem.length - 1 ? "" : "/" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = [
  ["家用电器"],
  ["手机", "运营商", "数码"],
  ["电脑", "办公"],
  ["家具", "家居", "家装", "厨房"],
  ["男装", "女装", "童装", "内衣"],
  ["美妆", "个人清洁", "宠物"],
  ["女鞋", "箱包", "珠宝", "钟表"],
  ["男鞋", "运动", "户外"],
  ["房产", "汽车", "汽车用品"],
  ["母婴", "玩具乐器"],
  ["食品", "酒类", "生鲜", "特产"],
  ["艺术", "礼品鲜花", "农牧园艺"],
  ["医药保健", "计生情趣"],
  ["图书", "文娱", "教育", "电子书"],
  ["机票", "酒店", "旅游", "生活"],
  ["支付", "白条", "保险", "企业金融"],
  ["安装", "维修", "清洗", "二手"],
  ["工业品", "元器件"],
];
</script>

<style scoped lang="less">
.menu-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 5px;
  .list {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      &:hover {
        color: @baseColor;
      }
    }
  }
}
</style>
