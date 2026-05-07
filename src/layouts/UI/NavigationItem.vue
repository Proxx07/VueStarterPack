<script setup lang="ts">
import type { INavItem } from '@/composables/useNavigation/types';
import { Button } from 'primevue';
import { computed } from 'vue';
import { arrowDown } from '@/assets/icons';
import VIcon from '@/components/UI/VIcon.vue';

const props = defineProps<{
  item: INavItem
  routeNames: Record<string, string>
  currentRouteName: string
  isChild?: boolean
}>();

const isOpened = computed<boolean>(() => Boolean(props.routeNames[props.item.name]));
const isActive = computed(() => props.item.name === props.currentRouteName);
const hasChild = computed(() => props.item?.children?.length);
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

        <VIcon
          v-if="hasChild"
          :icon="arrowDown"
          class="icon"
        />
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
  --icon-rotation: 0deg;

  &.opened {
    --icon-rotation: -180deg;
    grid-template-rows: auto 1fr;
    background: var(--p-button-text-secondary-hover-background);
  }

  .active {
    background: var(--p-button-text-secondary-active-background);
  }

  .icon {
    margin-left: auto;
    transform: rotateZ(var(--icon-rotation));
    transition: var(--transition-slow);
  }
}
</style>
