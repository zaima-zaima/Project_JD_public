<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { ElLoading } from "element-plus";
import { onMounted } from "vue";

let load: any;

onMounted(async () => {
  load.close();
});

(async function () {
  load = ElLoading.service({});
  document.title = "京东商城后台管理";
})();
</script>

<style scoped lang="less">
.app-container {
  height: 100%;
}
</style>
