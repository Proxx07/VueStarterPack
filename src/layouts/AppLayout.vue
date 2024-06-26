<script setup lang="ts">
import {useConfirmationsStore} from "@/store/confirmations";
import ConfirmationModal from "@/components/UI/confirmations/ConfirmationModal.vue";
import {storeToRefs} from "pinia";

const confirmationsStore = useConfirmationsStore();
const {confirmations} = storeToRefs(confirmationsStore)
</script>

<template>
  <component :is="$route.meta.layoutComponent">
    <slot/>
  </component>

  <div v-if="confirmations.length" id="confirmations-wrapper">
    <confirmation-modal v-for="confirmation in confirmations" :key="confirmation.id">
      <component :is="confirmation.component"/>
    </confirmation-modal>
  </div>
</template>
