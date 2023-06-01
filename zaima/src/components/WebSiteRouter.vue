<template>
  <div class="website-router">
    <div class="section feture">
      <div class="title">特色主题</div>
      <div class="item-box">
        <div class="item">新品首发</div>
        <div class="item">京东金融</div>
        <div class="item">全球售</div>
        <div class="item">台湾售</div>
        <div class="item">俄语站</div>
        <div class="item">装机大师</div>
        <div class="item">港澳售</div>
        <div class="item">优惠券</div>
        <div class="item">秒杀</div>
        <div class="item">印尼站</div>
        <div class="item">陪伴计划</div>
        <div class="item">出海招商</div>
        <div class="item">拍拍二手</div>
      </div>
    </div>
    <div class="section">
      <div class="title">行业频道</div>
      <div class="item-box">
        <div class="item">手机</div>
        <div class="item">智能数吗</div>
        <div class="item">电脑办公</div>
        <div class="item">家用电器</div>
        <div class="item">京东小家</div>
        <div class="item">京东服饰</div>
        <div class="item">京东生鲜</div>
        <div class="item">母婴</div>
        <div class="item">食品</div>
        <div class="item">农贸频道</div>
        <div class="item">整车</div>
        <div class="item">图书</div>
        <div class="item">劳动防护</div>
      </div>
    </div>
    <div class="section">
      <div class="title">生活服务</div>
      <div class="item-box">
        <div class="item">白条</div>
        <div class="item">京东金融App</div>
        <div class="item">京东小金库</div>
        <div class="item">话费</div>
        <div class="item">水电煤</div>
        <div class="item">彩票</div>
        <div class="item">旅行</div>
        <div class="item">机票酒店</div>
        <div class="item">电影票</div>
        <div class="item">京东到家</div>
        <div class="item">游戏</div>
        <div class="item">拍拍回收</div>
      </div>
    </div>
    <div class="section more">
      <div class="title">更多精选</div>
      <div class="item-box">
        <div class="item">合作招商</div>
        <div class="item">京东通讯</div>
        <div class="item">京东E卡</div>
        <div class="item">企业采购</div>
        <div class="item">服务市场</div>
        <div class="item">校园加盟</div>
        <div class="item">知识产权维权</div>
        <div class="item">京东安联保险</div>
        <div class="item">京东数科保险</div>
        <div class="item">京东零售云</div>
        <div class="item">关于我们</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.website-router {
  width: 1200px;
  height: 200px;
  padding: 10px;
  display: flex;
  .section {
    border-right: 1px solid rgb(234, 227, 227);
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-left: 10px;
    &.more {
      border: none;
    }
    .title {
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    &.feture {
      flex: 0 0 300px;
    }
    .item-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      .item {
        width: 80px;
        height: 30px;
        text-align: left;
        cursor: pointer;
        flex: 1 0 auto;
        box-sizing: border-box;
        &:hover {
          color: @baseColor;
        }
      }
    }
  }
}
</style>
