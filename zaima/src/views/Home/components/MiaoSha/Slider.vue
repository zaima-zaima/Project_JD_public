<template>
    <div class="slider-container" :style="{width:props.containerWidth + 'px'}">
        <div class="slider-inner" :style="{width: state.childWidth * props.data.length + 'px'}">
            <div class="slider-item" v-for="item in props.data" :key="item.id" :style="{width:state.childWidth + 'px'}">
                <SliderChild :child="item" />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import {SliderItem} from "../../../../types/miaosha";
import {watchEffect,reactive} from "vue";
import SliderChild from "./SliderChild.vue"

interface PropsType {
    data:SliderItem[],
    containerWidth:number
}

const props = defineProps<PropsType>()

const state = reactive({
    childWidth:0
})

watchEffect(() => {
    state.childWidth = props.containerWidth * ( 1 / 4 );
})



</script>


<style scoped lang="less">
    .slider-container {
        height:100%;
        overflow: scroll;
        &::-webkit-scrollbar {
            display:none;
        }
        .slider-inner {
            display: flex;
            height:100%;
            .slider-item {
                height:100%;
            }
        }
    }

</style>