<template>
    <div class="failed-container">
        <el-result icon="error" :title="`创建失败，原因是 ${props.error.msg}`" :sub-title="`${0}秒后将刷新页面，你可以再次重试`" />
    </div>
</template>


<script lang="ts" setup>
import { ErrorResponse } from "../../../types/Error";

interface PropsType {
    error: ErrorResponse
}
const props = defineProps<PropsType>();

</script>


<style scoped lang="less"></style>