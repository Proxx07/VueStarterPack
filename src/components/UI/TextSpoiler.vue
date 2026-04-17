<script setup lang="ts">
defineProps<{
  text: string
}>();
</script>

<template>
  <div v-tooltip.bottom="text" class="outer">
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  display: grid;
  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
