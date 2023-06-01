<template>
    <div class="navbar-container">
        <div class="navbar-inner">
            <div class="navbar-item hover-base active">
                <div class="title">精选</div>
                <div class="tip">猜你喜欢</div>
            </div>
            <div class="navbar-item hover-base">
                <div class="title">只能先锋</div>
                <div class="tip">大电器城</div>
            </div>
            <div class="navbar-item hover-base">
                <div class="title">居家优品</div>
                <div class="tip">品质生活</div>
            </div>
            <div class="navbar-item hover-base">
                <div class="title">超市百货</div>
                <div class="tip">百货生鲜</div>
            </div>
            <div class="navbar-item hover-base">
                <div class="title">时尚达人</div>
                <div class="tip">美妆穿搭</div>
            </div>
            <div class="navbar-item hover-base">
                <div class="title">进口好物</div>
                <div class="tip">京东国际</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>


</script>


<style scoped lang="less">
.navbar-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .navbar-inner {
        width: 90%;
        height: 100%;
        box-sizing: border-box;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .navbar-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #000;
            cursor: pointer;

            &.active {
                .title {
                    box-sizing: border-box;
                    padding: 2px 10px;
                    border-radius: 10px;
                    color: #fff;
                    background-color: @baseColor;
                }

                .tip {
                    color: @baseColor;
                }
            }

            &:hover {
                color: @baseColor;
            }

            .title {
                font-size: 16px;
                font-weight: bold;
                color: inherit;
            }

            .tip {
                color: inherit;
            }
        }
    }
}
</style>