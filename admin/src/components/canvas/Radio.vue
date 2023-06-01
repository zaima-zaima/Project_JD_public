<template>
    <canvas :width="props.width" :height="props.height" ref="canvas"></canvas>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

interface PropsType {
    width: number,
    height: number,
    lineWidth: number,
    text: string,
    color: string,
    animate?: boolean,
    duration?: number
}

const props = withDefaults(defineProps<PropsType>(), {
    duration: 1
});

const state = reactive({
    current: 0,
    timer: null as null
})

const canvas = ref<HTMLCanvasElement>();




onMounted(() => {

    if (props.animate) {

        // setInterval(() => {
        //     state.current += Math.PI * 2 / (props.duration * 1000 / 20);
        //     console.log(state.current);

        // }, 20)

    }

    if (canvas.value) {
        const ctx = canvas.value.getContext("2d");

        if (ctx) {
            ctx.beginPath();
            console.log(ctx?.lineWidth);
            ctx.arc(props.width / 2, props.height / 2, props.width / 2 - props.lineWidth, 0, props.animate ? Math.PI * state.current : Math.PI * 2, false);
            // ctx?.fill();
            ctx.font = "20px Arial"
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 10;
            ctx.fillStyle = props.color;
            ctx.strokeStyle = props.color;
            ctx.fillText(props.text, props.width / 2, props.height / 2);
            ctx?.stroke();
        }

    }

})

</script>


<style scoped lang="less"></style>