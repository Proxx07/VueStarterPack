<script setup lang="ts">
import type { IEmits, IProps } from '@/store/confirmations/types';
import { Button, Card } from 'primevue';
import { computed } from 'vue';
import VIcon from '@/components/UI/VIcon.vue';
import { ConfirmationTypesColor, ConfirmationTypesIcon } from '@/store/confirmations/models';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const color = computed(() => ConfirmationTypesColor[props.type]);
const icon = computed(() => ConfirmationTypesIcon[props.type]);
</script>

<template>
  <Card class="card">
    <template #content>
      <div class="header-wrapper">
        <VIcon :icon="icon" :color="color" class="icon" />

        <h1 class="font-22-b">
          {{ title }}
        </h1>
      </div>

      <div class="subtitle">
        {{ subtitle }}
      </div>

      <div class="buttons">
        <Button v-if="type === 'default'" fluid severity="secondary" @click="emit('reject')">
          Reject
        </Button>
        <Button fluid @click="emit('accept')">
          {{ type === 'default' ? 'Accept' : 'Оk' }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 30rem;
  :deep(.p-card-content) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--black);
  }
  .header-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    .icon {
      width: 4.5rem;
      min-width: 4.5rem;
    }
  }
  .subtitle {
    font: var(--font-16-r);
    line-height: 1.2;
  }
  .buttons {
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
  }
}
</style>
