<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { Button, InputGroup, InputGroupAddon, InputText } from 'primevue';
import { computed } from 'vue';
import { search as searchIcon } from '@/assets/icons';
import VIcon from './VIcon.vue';

const props = defineProps<{
  title?: string
  search?: string
  contentScrollable?: boolean
  noHeader?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>();

const commitSearch = useDebounceFn((val: string) => {
  emit('update:search', val);
}, 300);

const searchQuery = computed<string>({
  get() {
    return props.search ?? '';
  },
  set(val: string) {
    commitSearch(val);
  },
});
</script>

<template>
  <div class="page-wrapper">
    <div v-if="!props.noHeader" class="page-header">
      <div class="page-header__left">
        <slot name="header-left">
          <Button label="Назад" severity="secondary" fluid class="h-full" />
        </slot>
      </div>
      <div class="page-header__center">
        <InputGroup v-if="props.search !== undefined">
          <InputGroupAddon>
            <VIcon :icon="searchIcon" :size="19" color="var(--text-color)" />
          </InputGroupAddon>
          <InputText v-model="searchQuery" placeholder="Поиск" fluid />
        </InputGroup>
      </div>
      <div class="page-header__right">
        <slot name="header-right" />
      </div>
    </div>
    <h1 v-if="title">
      {{ title }}
    </h1>
    <div class="page-content" :class="[contentScrollable && 'scrollable']">
      <slot />
    </div>

    <div class="page-footer">
      <slot name="page-footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  color: v-bind(color);
  background: v-bind(bg);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.page-header {
  gap: 2rem;
  display: grid;
  grid-template-columns: 2fr 6fr 4fr;
  margin-bottom: 1.6rem;
  padding-right: 2rem;
  &__right {
    display: flex;
  }
}

.page-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  overflow: auto;
  overflow-x: hidden;
  padding-right: 2rem;
}
.page-footer {
  padding-top: 1rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
}
</style>
