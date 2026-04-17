<script setup lang="ts">
import type { ToastMessageOptions } from 'primevue/toast';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ConfirmationTypesIcon } from '@/store/confirmations/models';
import VIcon from './VIcon.vue';

defineProps<{
  message: ToastMessageOptions
}>();

const emit = defineEmits<{
  (e: 'close-toast'): void
}>();

const lifeTime = `3500ms`;
const indicator = ref<HTMLDivElement>();

const icons: Partial<Record<Exclude<ToastMessageOptions['severity'], undefined>, string>> = {
  success: ConfirmationTypesIcon.success,
  info: ConfirmationTypesIcon.info,
  warn: ConfirmationTypesIcon.default,
  error: ConfirmationTypesIcon.error,
};

const closeToast = () => emit('close-toast');

onMounted(() => {
  if (!indicator.value) return;
  indicator.value.addEventListener('animationend', closeToast);
});

onBeforeUnmount(() => {
  if (!indicator.value) return;
  indicator.value.removeEventListener('animationend', closeToast);
});
</script>

<template>
  <div class="toast-inner w-full">
    <VIcon
      v-if="message.severity && icons[message.severity]"
      :icon="icons[message.severity]!"
    />
    <div class="text">
      <div class="font-18-b">
        {{ message.summary }}
      </div>

      <div v-if="message.detail" class="detail">
        {{ message.detail }}
      </div>
    </div>

    <div ref="indicator" class="indicator" />
  </div>
</template>

<style scoped lang="scss">
.toast-inner {
  display: grid;
  grid-template-columns: 2.6rem auto;
  gap: .8rem;
  overflow: hidden;
  padding-bottom: .3rem;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: .2rem;
    background: currentColor;
    bottom: 0;
    animation: toast-indicator v-bind(lifeTime) forwards linear;
  }
  &:hover {
    .indicator {
      animation-play-state: paused;
    }
  }
}

.text {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.detail {
  font: var(--font-14-r);
  color: var(--text-color);
}
</style>
