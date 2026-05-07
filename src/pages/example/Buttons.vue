<script setup lang="ts">
import { Button, SelectButton } from 'primevue';
import { backArrow, marker } from '@/assets/icons';
import { useThemeMode } from '@/composables/UI';

const { modeModel, modes } = useThemeMode();
</script>

<template>
  <div class="wrapper">
    <div class="components">
      <SelectButton v-model="modeModel" :options="modes" :allow-empty="false" size="small" />
      <SelectButton v-model="modeModel" :options="modes" :allow-empty="false" />
      <SelectButton v-model="modeModel" :options="modes" :allow-empty="false" size="large" />
    </div>
    <div class="components">
      <Button label="Primary small" size="small" />
      <Button label="Primary" />
      <Button label="Primary large" size="large" />

      <Button label="Secondary small" size="small" severity="secondary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Secondary large" size="large" severity="secondary" />
    </div>

    <div class="components">
      <Button label="svg icon" :icon="marker" severity="success" />
      <Button label="Icon no-fill" :icon="marker" icon-pos="right" severity="info" icon-class="no-fill" />
      <Button label="Icon fill-red" :icon="marker" icon-pos="top" severity="secondary" icon-color="red" />

      <Button :icon="backArrow" severity="primary" text />

      <Button label="Loading test" severity="help" loading />
    </div>

    <div class="components">
      <Button label="Outlined primary" variant="outlined" size="small" />
      <Button label="Outlined primary" variant="outlined" />
      <Button label="Outlined primary" variant="outlined" size="large" />
      <Button label="Outlined secondary" variant="outlined" severity="secondary" size="small" />
      <Button label="Outlined secondary" variant="outlined" severity="secondary" />
      <Button label="Outlined secondary" variant="outlined" severity="secondary" size="large" />
      <Button variant="outlined" severity="secondary" :icon="marker" icon-color="currentColor" size="small" />
      <Button variant="outlined" severity="secondary" :icon="marker" icon-color="green" />
      <Button variant="outlined" severity="secondary" :icon="marker" icon-color="currentColor" size="large" />
    </div>

    <div class="components">
      <Button :icon="backArrow" severity="primary" size="large" raised variant="outlined" />
      <Button :icon="backArrow" severity="secondary" size="large" raised variant="outlined" />
      <Button :icon="backArrow" severity="info" size="large" raised variant="outlined" />
      <Button :icon="backArrow" severity="success" size="large" raised variant="outlined" />
      <Button :icon="backArrow" severity="danger" size="large" raised variant="outlined" />
      <Button :icon="backArrow" severity="help" size="large" raised variant="outlined" />
    </div>

    <div class="components">
      <Button label="Ghost" severity="primary" size="large" raised variant="outlined" />
      <Button label="Ghost" severity="secondary" size="large" raised variant="outlined" />
      <Button label="Ghost" severity="info" size="large" raised variant="outlined" />
      <Button label="Ghost" severity="success" size="large" raised variant="outlined" />
      <Button label="Ghost" severity="danger" size="large" raised variant="outlined" />
      <Button label="Ghost" severity="help" size="large" raised variant="outlined" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.components {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.2rem;
}
</style>
