<template>
    <div class="news-container">
        <div class="title">
            <span class="title_inner">
                京东快报
            </span>
            <span class="more hover-base">更多
                <Icon :type="StyleType.arrowRightSmall" />
            </span>
        </div>
        <div class="news-body">
            <div class="news-item" v-for="item in state.news">
                <div class="category">{{ item.category }}</div>
                <div class="news-title">{{ item.newsTitle }}</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import Icon from "../../../../components/Icon.vue"
import { StyleType } from "../../../../types/enum";
import { NewsItem } from "../../../../types/news";
import { getNews } from "../../../../api/news"
import { reactive } from "vue";

const state = reactive({
    news: [] as NewsItem[]
});



(async function () {
    state.news = await getNews();
})();

</script>


<style scoped lang="less">
.news-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
        width: 100%;
        height: 30px;
        // background-color: #f50e0e;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title_inner {
            font-size: 14px;
            font-weight: bold;
            color: #000;
        }

        .more {
            cursor: pointer;
        }
    }

    .news-body {
        flex: 1;
        // background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;

        .news-item {
            flex: 1;
            width: 100%;
            display:flex;
            align-items: center;
            margin:3px 0px;
            cursor: pointer;
            &:hover {
                .news-title {
                color:@baseColor;
            }
            }

            .category {
                width:30px;
                height:100%;
                margin-right:10px;
                flex-shrink: 0;
                text-align: center;
                display:flex;
                align-items: center;
                box-sizing: border-box;
                padding:3px;
                background-color: rgb(248, 211, 196);
                color:@baseColor;
            }
            .news-title {
                // flex-grow:1;
                // width:70%;
                width:calc(180px - 50px);
                flex-shrink: 0;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}</style>        