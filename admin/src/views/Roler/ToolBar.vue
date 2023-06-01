<template>
    <div class="tools-bar-container">
        <div class="total">总角色数 {{ props.total }}</div>
        <div class="tools">
            <div class="add-roler" @click="addRoler"><el-button type="primary" :icon="Plus" circle /></div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import {
    Plus
} from '@element-plus/icons-vue'

interface PropsType {
    total: number
}

const props = defineProps<PropsType>();

const emits = defineEmits(["addRoler"]);

function addRoler() {
    emits("addRoler");
}

</script>


<style scoped lang="less">
.tools-bar-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 20px;
}
</style>