<script setup lang="ts">
import type { InputMaskFieldProps } from '@/composables/Form/types';
import { InputMask } from 'primevue';

const props = defineProps<InputMaskFieldProps>();
</script>

<template>
  <InputMask v-bind="props" />
</template>

<style scoped lang="scss"></style>
