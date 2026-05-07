<script setup lang="ts">
import logo from '@/assets/vue.svg?raw';
import ThemeSwitcher from '@/components/UI/ThemeSwitcher.vue';
import VIcon from '@/components/UI/VIcon.vue';
import Navigation from '@/layouts/UI/Navigation.vue';
</script>

<template>
  <div class="app-inner">
    <aside class="aside">
      <div class="aside__top">
        <VIcon :icon="logo" no-fill />
        <span class="name">COMPANY_NAME</span>
      </div>
      <div class="aside__content">
        <Navigation />
      </div>
      <div class="aside__bottom">
        <ThemeSwitcher />
      </div>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-inner {
  --inner-bg: var(--secondary-500);
  [class='app-dark'] & {
    --inner-bg: var(--p-zinc-900);
  }
  display: grid;
  grid-template-columns: 31rem auto;
  grid-template-rows: 100dvh;
  width: 100%;
  position: relative;
  overflow: hidden;
  max-height: 100dvh;
  min-height: 100dvh;
  background: var(--inner-bg);
}
.name {
  font: var(--font-28-b);
}

.aside {
  display: flex;
  flex-direction: column;
  &__top,
  &__bottom {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1.2rem;
    font-size: 0;
  }

  &__content {
    flex-grow: 1;
    overflow-y: auto;
    margin: 1rem 0;
  }
}

main {
  --main-pl: 2rem;
  --main-pt: 1.6rem;
  padding-top: var(--main-pt);
  padding-left: var(--main-pl);
  position: relative;
  overflow: hidden;
  background: var(--site-bg);
  border-radius: var(--radius-l) 0 0 var(--radius-l);
}
</style>
