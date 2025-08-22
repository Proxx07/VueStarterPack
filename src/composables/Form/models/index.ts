import type { FormRule } from '@/composables/Form/types';

type RuleFactory<Args extends any[] = []> = (...args: Args) => FormRule;

export const formRules = {
  required: (): FormRule => (value: string | number) => !!value || 'Required field!',
  minLength: (opt: number): FormRule => (value: string | number) => String(value).length >= opt || `Length must be greater than ${opt}`,
} satisfies Record<string, RuleFactory<any>>;
