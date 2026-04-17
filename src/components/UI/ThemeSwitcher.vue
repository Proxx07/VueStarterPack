<script setup lang="ts">
import { ToggleSwitch } from 'primevue';
import { computed } from 'vue';
import { moon, sun } from '@/assets/icons';
import { useThemeMode } from '@/composables/UI';
import TransitionContainer from './TransitionContainer.vue';
import VIcon from './VIcon.vue';

const { modeModel, modes, isDark } = useThemeMode();
const iconColor = computed(() => isDark.value ? '#ffe600' : 'black');
</script>

<template>
  <ToggleSwitch
    v-model="modeModel"
    :false-value="modes[0]"
    :true-value="modes[1]"
    class="theme-switcher"
  >
    <template #handle="{ checked }">
      <TransitionContainer
        :name="modeModel === 'light' ? 'slide-in-left' : 'slide-in-right'"
        :key-id="modeModel"
      >
        <VIcon
          :icon="checked ? moon : sun"
          :color="iconColor"
          class="icon"
        />
      </TransitionContainer>
    </template>
  </ToggleSwitch>
</template>

<style scoped lang="scss">
.theme-switcher {
  --p-toggleswitch-width: 6.2rem;
  --p-toggleswitch-height: 3.3rem;
  --p-toggleswitch-handle-size: 2.6rem;
  --p-toggleswitch-handle-checked-background: black;
  --p-toggleswitch-slide-duration: .2s;
  font-size: 0;
  :deep(.p-toggleswitch-handle) {
    inset-inline-start: .6rem;
    overflow: hidden;
  }
  &.p-toggleswitch-checked {
    :deep(.p-toggleswitch-handle) {
      inset-inline-start: 3.2rem;
      font-size: 0;
      background: var(--p-toggleswitch-handle-checked-background) !important;
    }
  }

  :deep(.transition-element) {
    transition: var(--transition-slow);
  }
}
.icon {
  width: calc(var(--p-toggleswitch-handle-size) / 1.5);
  height: calc(var(--p-toggleswitch-handle-size) / 1.5);
}
</style>
