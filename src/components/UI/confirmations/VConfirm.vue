<script setup lang="ts">
import type { IEmits, IProps } from '@/store/confirmations/types';
import { Button, Card } from 'primevue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ConfirmationTypesColor, ConfirmationTypesIcon } from '@/store/confirmations/models';
import VIcon from '../VIcon.vue';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
const { t } = useI18n();

const color = computed(() => ConfirmationTypesColor[props.type]);
const icon = computed(() => ConfirmationTypesIcon[props.type]);
</script>

<template>
  <Card class="card">
    <template #content>
      <VIcon
        :icon="icon"
        :color="color"
        class="icon"
        span-bg="color-mix(in srgb,currentColor,transparent 80%)"
      />

      <h1 v-if="title" class="font-30-b">
        {{ t(title) }}
      </h1>

      <div v-if="subtitle" class="subtitle">
        {{ t(subtitle) }}
      </div>

      <div class="buttons">
        <Button v-if="type === 'default'" fluid severity="secondary" size="large" @click="emit('reject')">
          {{ t('confirmations.reject') }}
        </Button>
        <Button fluid size="large" @click="emit('accept')">
          {{ type === 'default' ? t('confirmations.accept') : 'Оk' }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 42rem;
  --p-card-body-padding: 2.6rem 2rem 2rem;
  @include media-max($mobile) {
    --p-card-body-padding: 1.4rem 2rem 2rem;
  }
  :deep(.p-card-content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    text-align: center;
  }
  .icon {
    width: 6.2rem;
    min-width: 6.2rem;
    padding: .6rem;
    border-radius: var(--radius-round);
  }
  .subtitle {
    font: var(--font-16-r);
    line-height: 1.2;
  }
  .buttons {
    display: flex;
    gap: 1rem;
    padding-top: 1.2rem;
    width: 100%;
  }
}
</style>
