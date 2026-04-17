import { useDebounceFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { tabItems } from './models';

export const useExamplesPage = () => {
  const $router = useRouter();

  const routeTransitionName = ref<'route-forward-transition' | 'route-back-transition' | 'route-fade'>('route-fade');

  const resetTransition = useDebounceFn(() => {
    routeTransitionName.value = 'route-fade';
  }, 1000);

  const checkIsBackTransition = (name: string) => {
    const currentRouteIndex = tabItems.findIndex(item => item.name === $router.currentRoute.value.name);
    const newRouteIndex = tabItems.findIndex(item => item.name === name);
    routeTransitionName.value = currentRouteIndex > 0 && newRouteIndex < currentRouteIndex ? 'route-back-transition' : 'route-forward-transition';
    resetTransition();
  };

  const currentTab = computed({
    get() {
      return $router.currentRoute.value.name as string;
    },
    set(name: string) {
      checkIsBackTransition(name);
      $router.push({ name });
    },
  });

  return {
    tabItems,
    currentTab,
    routeTransitionName,
  };
};
