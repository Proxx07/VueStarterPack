<script setup lang="ts">
import type { INavItem } from '@/composables/useNavigation/types';
import { Button } from 'primevue';
import { computed } from 'vue';

const props = defineProps<{
  item: INavItem
  routeNames: Record<string, string>
  currentRouteName: string
}>();

const isOpened = computed<boolean>(() => Boolean(props.routeNames[props.item.name]));
const isActive = computed(() => props.item.name === props.currentRouteName);
</script>

<template>
  <li :class="{ opened: isOpened && item.children }">
    <RouterLink :to="{ name: item.name }">
      <Button
        fluid
        size="large"
        severity="secondary"
        variant="text"
        class="text-left"
        :class="[isActive && 'active']"
      >
        {{ item.label }}
      </Button>
    </RouterLink>

    <ul v-if="item.children">
      <NavigationItem
        v-for="childItem in item.children"
        :key="childItem.name"
        :item="childItem"
        :route-names="routeNames"
        :current-route-name="currentRouteName"
      />
    </ul>
  </li>
</template>

<style scoped lang="scss">
li {
  display: grid;
  grid-template-rows: auto 0fr;
  transition: var(--transition-slow);
  &.opened {
    grid-template-rows: auto 1fr;
    background: var(--p-button-text-secondary-active-background);
  }
  .active {
    background: var(--p-button-text-secondary-active-background);
  }
}
</style>
