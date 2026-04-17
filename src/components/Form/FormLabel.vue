<script setup lang="ts">
import { FloatLabel, Message } from 'primevue';
import { loadingIcon } from '@/assets/icons/';

const props = defineProps<{
  label?: string
  for?: string
  errorMessage?: string
  labelClass?: string
  loading?: boolean
}>();
</script>

<template>
  <div class="w-full">
    <FloatLabel variant="on" class="form-label">
      <label
        v-if="props.label"
        :for="props.for"
        :class="props.labelClass"
      >
        <span v-html="props.label" />
        <span v-if="loading" v-html="loadingIcon" />
      </label>
      <slot />
    </FloatLabel>

    <Message v-if="errorMessage" severity="error" class="w-full" size="small" variant="simple">
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
  margin-bottom: 0.6rem;
  label {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: .5rem;
    z-index: 10;
  }

  .rotate-animation {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:has(input[type='checkbox']) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
