<script setup lang="ts">
import { Dialog } from 'primevue';

const emit = defineEmits<{
  (e: 'remove-confirmation'): void
}>();
</script>

<template>
  <Dialog
    :closable="false"
    :show-header="false"
    class="confirmation-dialog"
    append-to="self"
    @after-hide="emit('remove-confirmation')"
  >
    <slot />
  </Dialog>
</template>

<style scoped lang="scss"></style>
