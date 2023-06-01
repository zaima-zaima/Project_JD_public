<template>
    <div class="reference-container">
        <div class="reference">
            <span class="item">关于我们</span>
            <span>|</span>
            <span class="item">联系我们</span>
            <span>|</span>
            <span class="item">人才招聘</span>
            <span>|</span>
            <span class="item">商家入驻</span>
            <span> |</span>
            <span class="item">广告服务</span>
            <span>|</span>
            <span class="item">手机京东</span>
            <span>|</span>
            <span class="item">友情链接</span>
            <span>|</span>
            <span class="item">销售联盟</span>
            <span>|</span>
            <span class="item">京东社区</span>
            <span>|</span>
            <span class="item">京东公益</span>
        </div>
        <div class="copyRight">Copyright © 2004-2023 京东JD.com 版权所有</div>
    </div>
</template>


<script lang="ts" setup>


</script>


<style scoped lang="less">
.reference-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .reference {
        margin-bottom: 5px;

        span {
            padding: 3px 5px;
        }

        .item {
            cursor: pointer;

            &:hover {
                color: @baseColor;
            }
        }
    }
}
</style>