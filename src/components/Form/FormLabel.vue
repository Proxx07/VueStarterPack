<script setup lang="ts">
import { Message } from 'primevue';

const props = defineProps<{
  label?: string
  errorMessage?: string
}>();
</script>

<template>
  <div class="form-label">
    <label v-if="props.label">{{ label }}</label>
    <slot />
    <Message v-if="errorMessage" severity="error" class="font-14-r">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style scoped lang="scss">
.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}
</style>
