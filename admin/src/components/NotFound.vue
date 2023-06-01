<template>
  <div class="not-found">{{ text }}</div>
</template>

<script setup lang="ts">
interface PropsType {
  text: string;
}

defineProps<PropsType>();
</script>

<style scoped lang="less"></style>
