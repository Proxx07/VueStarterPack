<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="app-inner">
    <navigation/>
    <div class="site-content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-inner {
  padding: 1.2rem;
}
</style>
