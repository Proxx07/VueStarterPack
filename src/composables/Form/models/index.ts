import type { MaybeRefOrGetter } from 'vue';
import type { ComposerTranslation } from 'vue-i18n';
import type { FormRule } from '../types';
import type { MessageSchema } from '@/plugins/i18n/types';
import { toValue } from 'vue';
import { i18n } from '@/plugins/i18n';

const formRules = ($t: ComposerTranslation<MessageSchema>) => {
  return {
    required: (): FormRule<string | number> => (value: string | number) => !!value || $t('rules.required'),
    minLength: (opt: MaybeRefOrGetter<number>): FormRule<string> => (value: string) => {
      const min = toValue(opt);
      return String(value).length >= min || $t('rules.minLength', { opt: min });
    },
    minValue: (opt: MaybeRefOrGetter<number>): FormRule<number> => (value: number) => {
      const min = toValue(opt);
      return value >= min || $t('rules.minValue', { opt: min });
    },
    birthDate: (): FormRule<string> => (value: string) => {
      const [day, month, year] = value.split('/');
      if (!day || !month || !year) return $t('rules.invalidDate');
      if (+day > 31) return $t('rules.invalidDate');
      if (+month > 12) return $t('rules.invalidDate');
      return true;
    },
  };
};

export const $formRules = formRules(i18n.global.t);

export type FormRules = ReturnType<typeof formRules>;
