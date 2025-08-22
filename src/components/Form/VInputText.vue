<script setup lang="ts">
import type { InputTextFieldProps } from '@/composables/Form/types';
import { InputText } from 'primevue';
import { computed, inject, onBeforeMount, onBeforeUnmount, useId } from 'vue';
import FormLabel from '@/components/Form/FormLabel.vue';

import { ADD_FORM_VALIDATION_RULE, IS_VALIDATED } from '@/composables/Form/types';

const props = defineProps<InputTextFieldProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const val = computed({
  get() {
    return props.modelValue;
  },

  set(value: string | undefined) {
    if (typeof value !== 'string') return;
    emit('update:modelValue', value);
  },
});

let removeValidationRule: () => boolean;
const id = useId();
const isValidated = inject(IS_VALIDATED);
const addValidationToForm = inject(ADD_FORM_VALIDATION_RULE);

const errorMessage = computed(() => {
  if (!props.rules || !props.rules.length) return '';
  for (const rule of props.rules) {
    if (typeof rule(props.modelValue) === 'string') return rule(props.modelValue) as string;
  }
  return '';
});

const fieldValid = computed(() => {
  if (!props.rules || !props.rules.length) return true;
  if (!isValidated?.value) return true;
  return !errorMessage.value;
});

onBeforeMount(() => {
  if (!props.rules || typeof addValidationToForm === 'undefined') return;
  removeValidationRule = addValidationToForm(id, fieldValid);
});

onBeforeUnmount(() => {
  if (removeValidationRule) removeValidationRule();
});
</script>

<template>
  <FormLabel :label="props.label" :error-message="!fieldValid ? errorMessage : ''">
    <InputText v-bind="{ ...props, ...$attrs }" v-model="val" :invalid="!fieldValid" />
  </FormLabel>
</template>

<style scoped lang="scss"></style>
