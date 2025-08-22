<script setup lang="ts">
import type { InputNumberFieldProps } from '@/composables/Form/types';
import { InputNumber } from 'primevue';

const props = defineProps<InputNumberFieldProps>();
</script>

<template>
  <InputNumber v-bind="props" />
</template>

<style scoped lang="scss"></style>
