<script setup lang="ts">
import { Tab, TabList, Tabs } from 'primevue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useExamplesPage } from '@/composables/useExamplesPage';

const { currentTab, tabItems, routeTransitionName } = useExamplesPage();
</script>

<template>
  <PageWrapper title="Example page" no-header>
    <Tabs v-model:value="currentTab" style="margin-bottom: 2rem">
      <TabList>
        <Tab v-for="tab in tabItems" :key="tab.name" :value="tab.name">
          {{ tab.label }}
        </Tab>
      </TabList>
    </Tabs>

    <div class="inner-page">
      <router-view v-slot="{ Component, route }">
        <transition :name="routeTransitionName">
          <component
            :is="Component"
            :key="route.path"
          />
        </transition>
      </router-view>
    </div>
  </PageWrapper>
</template>

<style lang="scss" scoped>
.inner-page {
  position: relative;
  flex-grow: 1;
  display: flex;
  > * {
    flex-grow: 1;
    &:nth-child(2) {
      position: absolute;
      inset: 0;
    }
  }
}
</style>
