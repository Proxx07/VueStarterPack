<script setup lang="ts">
import { Toast } from 'primevue';
import ConfirmationModal from '@/components/UI/confirmations/ConfirmationModal.vue';
import VToast from '@/components/UI/VToast.vue';
import { useConfirmationsStore } from '@/store/confirmations';
import { useToastStore } from '@/store/toastsStore.ts';

const confirmationsStore = useConfirmationsStore();
const toastStore = useToastStore();
</script>

<template>
  <component :is="$route.meta.layoutComponent">
    <slot />
  </component>

  <div v-if="confirmationsStore.confirmations.length" id="confirmations-wrapper">
    <ConfirmationModal
      v-for="confirmation in confirmationsStore.confirmations"
      :key="confirmation.id"
      v-model:visible="confirmation.visible"
      @remove-confirmation="confirmationsStore.closeConfirmation(confirmation.id)"
    >
      <component :is="confirmation.component" />
    </ConfirmationModal>
  </div>

  <Toast>
    <template #message="{ message }">
      <VToast
        :message="message"
        @close-toast="toastStore.removeToast(message)"
      />
    </template>
  </Toast>
</template>
