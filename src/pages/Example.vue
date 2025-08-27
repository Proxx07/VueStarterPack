<script setup lang="ts">
import { Button, Checkbox, Message, SelectButton } from 'primevue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { marker } from '@/assets/icons';
import FormLabel from '@/components/Form/FormLabel.vue';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import VInputNumber from '@/components/Form/VInputNumber.vue';
import VInputText from '@/components/Form/VInputText.vue';
import LangSwitcher from '@/components/UI/LangSwitcher.vue';
import { formRules } from '@/composables/Form/models';
import { $confirm } from '@/plugins/confirmation.ts';

const { t } = useI18n();

const defaultConfirm = async () => {
  const result = await $confirm.default({ title: 'Confirmation title', subtitle: `Are you sure to do smth? ${t('hello')}` });
  if (result) {
    console.log('Do smth after accept.');
  }
  else {
    console.log('Do smth after reject.');
  }
};

const infoConfirm = async () => {
  await $confirm.info({ title: 'Info confirmation', subtitle: 'Info confirmation subtitle' });
  console.log('After button click. Info');
};

const successConfirm = async () => {
  await $confirm.success({ title: 'Success confirm', subtitle: 'Success confirmation subtitle' });
  console.log('After button click. Success');
};

const errorConfirm = async () => {
  await $confirm.error({ title: 'Error confirm', subtitle: 'Error confirmation subtitle' });
  console.log('After button click. Error');
};

const selectButtonOptions = ['light', 'dark'];
const loading = ref(true);

const text = ref('');
const text2 = ref('');
const text3 = ref('');
const numberFieldValue = ref(0);
const maskFieldValue = ref('');
const maskFieldValue2 = ref('');

const secondField = ref(false);
const setThirdFieldRequired = ref(false);
const thirdFieldRules = computed(() => {
  if (!setThirdFieldRequired.value) return [];
  return [formRules.required()];
});

const handleSubmit = () => {
  alert('Form submited');
};
</script>

<template>
  <div class="page">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <LangSwitcher />
      {{ $tl('page.example', { name: '123' }) }}
      <h1>
        {{ $tl('hello') }}
      </h1>

      <SelectButton :options="selectButtonOptions" />
    </div>
    <hr>

    <Button label="Primary small" size="small" />
    <Button label="Primary" />
    <Button label="Primary large" size="large" />

    <Button label="Secondary small" size="small" severity="secondary" />
    <Button label="Secondary" severity="secondary" />
    <Button label="Secondary large" size="large" severity="secondary" />

    <hr>
    <Button label="svg icon" size="large" :icon="marker" severity="success" />
    <Button label="Check icon fill" size="large" :icon="marker" icon-pos="right" severity="info" icon-class="no-fill" />
    <Button label="Loading test" severity="help" size="large" :loading="loading" />
    <hr>

    <Button label="Default confirmation" severity="warn" @click="defaultConfirm" />
    <Button label="Info confirmation" severity="info" @click="infoConfirm" />
    <Button label="Success confirmation" severity="success" @click="successConfirm" />
    <Button label="Error confirmation" severity="danger" @click="errorConfirm" />
    <hr>

    <Message severity="info">
      Info message example
    </Message>
    <hr>

    <VForm @submit-form="handleSubmit">
      <div class="form-wrapper">
        <div class="field-group">
          <VInputText
            v-model="text"
            placeholder="Text-field-1"
            :rules="[$formRules.required(), $formRules.minLength(10)]"
          />

          <VInputText
            v-if="secondField"
            v-model="text2"
            placeholder="Text-field-2"
            :rules="[$formRules.required()]"
          />
          <template v-else>
            <div class="font-16-b w-full" style="text-align: center;">
              Second field!
            </div>
          </template>

          <VInputText
            v-model="text3"
            placeholder="Text-field-3"
            :rules="thirdFieldRules"
          />
        </div>

        <div class="field-group">
          <VInputNumber
            v-model="numberFieldValue"
            :min="0"
            :rules="[$formRules.required(), $formRules.minValue(20)]"
            show-buttons
            button-layout="horizontal"
            placeholder="Number field"
          />
          <VInputNumber
            v-model="numberFieldValue"
            :min="0"
            :rules="[$formRules.required(), $formRules.minValue(10)]"
            show-buttons
            placeholder="Number field"
          />
        </div>

        <div class="field-group">
          <VInputMask
            v-model="maskFieldValue"
            mask="99-99-99"
            placeholder="Numbers with mask"
            :rules="[$formRules.required()]"
          />
          <VInputMask
            v-model="maskFieldValue2"
            mask="aa-aa-aa"
            placeholder="Letters with mask"
          />
        </div>
        <div class="field-group">
          <FormLabel label="Show second field" for="check-1">
            <Checkbox v-model="secondField" binary input-id="check-1" />
          </FormLabel>

          <FormLabel label="Set third field required" for="check-2">
            <Checkbox v-model="setThirdFieldRequired" binary input-id="check-2" />
          </FormLabel>
        </div>
      </div>
      <Button type="submit" label="Submit" fluid style="margin-top: 1.6rem" />
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  hr {
    width: 100%;
  }
}

.form-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.field-group {
  display: flex;
  gap: 1rem;
}
</style>
