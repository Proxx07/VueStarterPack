<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import animationDark from '@/assets/animations/animation-dark.json';
import animationLight from '@/assets/animations/animation-light.json';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useThemeMode } from '@/composables/UI';

const { isDark } = useThemeMode();
</script>

<template>
  <PageWrapper title="Lottie animation example" bg-color="transparent" no-header>
    <Vue3Lottie
      :animation-data="isDark ? animationDark : animationLight"
      :loop="false"
      class="animation"
    />
  </PageWrapper>
</template>

<style scoped lang="scss">
.animation {
  max-width: 25rem;
  margin: 0 auto;
}
</style>
