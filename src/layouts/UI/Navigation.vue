<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { collectMatchedRoutesEnum, NavigationItems } from '@/composables/useNavigation/models';
import NavigationItem from './NavigationItem.vue';

const $route = useRoute();
const currentRouteName = computed<string>(() => $route.name as string || '');
const routeNameMap = computed<Record<string, string>>(() => collectMatchedRoutesEnum($route.matched));
</script>

<template>
  <nav>
    <ul>
      <NavigationItem
        v-for="item in NavigationItems"
        :key="item.name"
        :item="item"
        :current-route-name="currentRouteName"
        :route-names="routeNameMap"
      />
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  padding: 2rem 0;
  :deep(.p-button) {
    border-radius: 0;
  }
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  :deep(ul) {
    display: flex;
    flex-direction: column;
    margin: 0;
    list-style: none;
    min-height: 0;
    overflow: hidden;
    > li {
      flex-grow: 1;
      min-height: max-content;
    }
  }
}
</style>
