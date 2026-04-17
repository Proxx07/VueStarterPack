<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useThemeMode } from '@/composables/UI/';
import AppLayout from '@/layouts/AppLayout.vue';
import { getCurrentLocale, setCurrentLocale } from '@/plugins/i18n/models';

const { setTheme } = useThemeMode();

onBeforeMount(() => {
  setCurrentLocale(getCurrentLocale());
  setTheme();
});
</script>

<template>
  <AppLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="route-transition">
        <component
          :is="Component"
          :key="route.matched[0]?.path ?? route.path"
        />
      </transition>
    </router-view>
  </AppLayout>
</template>
