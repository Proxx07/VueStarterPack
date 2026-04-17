import type { MaybeRefOrGetter } from 'vue';
import type { FormRule } from './types';
import { toValue } from '@vue/reactivity';
import { computed, ref } from 'vue';

export const useValidation = <T extends Record<string, any>>(model: MaybeRefOrGetter<T>, rules: Partial<{ [K in keyof T]: FormRule<T[K]>[] }>) => {
  const isValidated = ref<boolean>(false);

  const errors = computed<Partial<Record<keyof T, string>>>(() => {
    const obj = toValue(model);
    const result: Partial<Record<keyof T, string>> = {};

    if (!isValidated.value) return result;
    (Object.keys(obj) as (keyof T)[]).forEach((key) => {
      const fieldRules = rules[key];
      if (!fieldRules) return;

      for (const rule of fieldRules) {
        const res = rule(obj[key]);

        if (res === true) continue;
        result[key] = res === false ? 'Invalid value' : res;
        break;
      }
    });
    return result;
  });

  const isValid = computed(() => !Object.keys(errors.value).length);

  return {
    errors,
    isValid,
    isValidated,
  };
};
