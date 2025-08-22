import type { InputMaskProps, InputNumberProps, InputTextProps } from 'primevue';
import type { ComputedRef, InjectionKey, Ref } from 'vue';

export type FormRule = (value: string | number) => string | boolean;

export const IS_VALIDATED: InjectionKey<Ref<boolean>> = Symbol('isValidated');
export const ADD_FORM_VALIDATION_RULE: InjectionKey<(id: string, value: ComputedRef<boolean>) => () => boolean> = Symbol('addValidationToForm');

interface IFormField {
  label?: string
  rules?: Array<FormRule>
  modelValue: string | number
}

export type InputTextFieldProps = IFormField & /* @vue-ignore */ InputTextProps;
export type InputNumberFieldProps = IFormField & /* @vue-ignore */ InputNumberProps;
export type InputMaskFieldProps = IFormField & /* @vue-ignore */ InputMaskProps;
