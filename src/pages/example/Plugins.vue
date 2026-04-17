<script setup lang="ts">
import { Button, InputText, Message } from 'primevue';
import { ref } from 'vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import LangSwitcher from '@/components/UI/LangSwitcher.vue';
import ThemeSwitcher from '@/components/UI/ThemeSwitcher.vue';
import { $confirm } from '@/plugins/confirmation.ts';
import { useToastStore } from '@/store/toastsStore.ts';

const $toast = useToastStore();
const dialogModal = ref(false);
const severities = ['error', 'secondary', 'info', 'success', 'warn', 'contrast'];

const defaultConfirm = async () => {
  const result = await $confirm.default({ title: 'toast.warn', subtitle: 'confirmations.warning' });
  if (result) {
    $toast.info('Do smth after accept.');
  }
  else {
    $toast.warning('Do smth after reject.');
  }
};
const infoConfirm = async () => {
  await $confirm.info({ title: 'toast.info', subtitle: 'confirmations.warning' });
  $toast.info('After button click. Info');
};
const successConfirm = async () => {
  await $confirm.success({ title: 'toast.success', subtitle: 'confirmations.warning' });
  $toast.success('After button click. Success');
};
const errorConfirm = async () => {
  await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.warning' });
  $toast.error('After button click. Error');
};
</script>

<template>
  <div class="wrapper">
    <h2>Plugins</h2>

    <div class="components">
      <LangSwitcher />
      <ThemeSwitcher />
    </div>

    <div class="components">
      <Button label="Default confirmation" severity="warn" @click="defaultConfirm" />
      <Button label="Info confirmation" severity="info" @click="infoConfirm" />
      <Button label="Success confirmation" severity="success" @click="successConfirm" />
      <Button label="Error confirmation" severity="error" @click="errorConfirm" />
    </div>

    <div class="components">
      <Button label="Warning toast" severity="warn" @click="$toast.warning('Warning toast');" />
      <Button label="Info toast" severity="info" @click="$toast.info('Info toast');" />
      <Button label="Success toast" severity="success" @click="$toast.success('Success toast');" />
      <Button label="Error toast" severity="error" @click="$toast.error('Error toast');" />
    </div>

    <div class="components">
      <Message v-for="type in severities" :key="type" :severity="type">
        {{ type }} message example
      </Message>
    </div>

    <div class="components">
      <Button size="large" label="Base dialog (bottom-sheet)" @click="dialogModal = true;" />
    </div>
    <BaseDialog v-model:visible="dialogModal">
      <template #header>
        <h3>{HEADER}</h3>
      </template>

      <div style="display: grid; gap: 1rem;">
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
        <InputText placeholder="Text-field-large" size="large" />
      </div>

      <template #footer>
        <Button label="Submit" fluid size="large" />
      </template>
    </BaseDialog>
  </div>
</template>

<style lang="scss" scoped>
.components {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2.4rem;
}

h2 {
  margin-bottom: 2rem;
}
</style>
