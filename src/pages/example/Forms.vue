<script setup lang="ts">
import { Button, InputNumber, InputText, Select } from 'primevue';
import { ref } from 'vue';
import FormLabel from '@/components/Form/FormLabel.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import { useValidation } from '@/composables/Form';
import { $formRules } from '@/composables/Form/models';
import { useMask } from '@/composables/UI';

const severities = ['error', 'secondary', 'info', 'success', 'warn', 'contrast'];

const { maskedValue: stringMask, maskModel: stringMaskModel } = useMask('@@-@@-AA');

const test = ref({
  str: 'aaa',
  strUnmasked: 'aaa',
  number: '',
});

const nameMinLength = ref(10);
const testValidationModel = ref({
  age: 0,
  name: '',
  surname: '',
  maskedString: '',
  unmaskedString: '',
});

const { errors, isValidated, isValid } = useValidation(testValidationModel, {
  name: [$formRules.required(), $formRules.minLength(nameMinLength)],
  age: [$formRules.required(), $formRules.minValue(18)],
  surname: [$formRules.required()],
  maskedString: [$formRules.required(), $formRules.minLength(8)],
  unmaskedString: [$formRules.required(), $formRules.minLength(6)],
});

const submitForm = () => {
  isValidated.value = true;
  if (!isValid.value) return;
  // eslint-disable-next-line no-alert
  alert(`form-submitted \n ${JSON.stringify(testValidationModel.value)}`);
};
</script>

<template>
  <div class="wrapper">
    <div class="components">
      <InputText placeholder="Text-field-small" size="small" />
      <InputText placeholder="Text-field-regular" />
      <InputText placeholder="Text-field-large" size="large" />

      <Select size="small" :options="severities" placeholder="Select small" />
      <Select :options="severities" placeholder="Select" />
      <Select size="large" :options="severities" placeholder="Select large" loading />
    </div>

    <div class="components">
      <FormLabel label="Float label small">
        <InputText size="small" />
      </FormLabel>

      <FormLabel label="Float label">
        <InputText />
      </FormLabel>

      <FormLabel label="Float label large">
        <InputText size="large" />
      </FormLabel>

      <FormLabel label="Float label loading" loading>
        <InputText size="large" readonly />
      </FormLabel>
    </div>

    <div class="components">
      <FormLabel label="Letters with mask">
        <InputText
          v-model="stringMask"
          v-maska="stringMaskModel"
        />
      </FormLabel>
      <FormLabel label="Letters with mask-2">
        <VInputMask
          v-model="test.str"
          v-model:unmasked="test.strUnmasked"
          mask="@@-@@-AA"
        />
      </FormLabel>
      <FormLabel label="Number with mask">
        <VInputMask
          v-model="test.number"
          mask="##-##"
        />
      </FormLabel>
    </div>

    <h3> Form </h3>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
      <form @submit.prevent="submitForm">
        <FormLabel label="name" :error-message="errors.name">
          <InputText v-model="testValidationModel.name" size="large" />
        </FormLabel>

        <FormLabel label="name min length">
          <InputNumber v-model="nameMinLength" size="large" />
        </FormLabel>

        <FormLabel label="Age" :error-message="errors.age">
          <InputNumber v-model="testValidationModel.age" size="large" locale="ru-RU" />
        </FormLabel>

        <FormLabel label="surname" :error-message="errors.surname">
          <InputText v-model="testValidationModel.surname" size="large" />
        </FormLabel>
        <FormLabel label="maskedString" :error-message="errors.maskedString">
          <VInputMask
            v-model="testValidationModel.maskedString"
            mask="@@-@@-AA"
            size="large"
          />
        </FormLabel>
        <FormLabel label="unmaskedString" :error-message="errors.unmaskedString">
          <VInputMask
            v-model:unmasked="testValidationModel.unmaskedString"
            mask="##-##-##"
            size="large"
          />
        </FormLabel>

        <Button label="submit" class="colspan-2" fluid severity="success" size="large" type="submit" />
      </form>
      <pre style="row-span: 6">{{ testValidationModel }}</pre>
    </div>
  </div>
</template>

<style scoped>
.components {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.2rem;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6em;
}

h3 {
  margin-bottom: 2rem;
}
</style>
