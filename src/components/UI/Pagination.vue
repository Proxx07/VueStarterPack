<script setup lang="ts">
import type { ButtonProps } from 'primevue/button';
import { Button } from 'primevue';
import { computed } from 'vue';
import { backArrow } from '@/assets/icons';

const props = defineProps<{
  totalPages: number
  buttonsSize?: ButtonProps['size']
  siblingCount?: number
  boundaryCount?: number
}>();

const page = defineModel<number>('page', { required: true });

const siblingCount = computed(() => props.siblingCount ?? 1);
const boundaryCount = computed(() => props.boundaryCount ?? 1);

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const items = computed<(number | '...')[]>(() => {
  const total = props.totalPages;
  const current = page.value;
  const boundary = boundaryCount.value;
  const sibling = siblingCount.value;

  const totalVisible = boundary * 2 + sibling * 2 + 3;
  if (total <= totalVisible) return range(1, total);

  const startPages = range(1, boundary);
  const endPages = range(total - boundary + 1, total);

  const siblingStart = Math.max(current - sibling, boundary + 2);
  const siblingEnd = Math.min(current + sibling, total - boundary - 1);

  const showLeftEllipsis = siblingStart > boundary + 2;
  const showRightEllipsis = siblingEnd < total - boundary - 1;

  const result: (number | '...')[] = [...startPages];

  if (showLeftEllipsis) result.push('...');
  else if (boundary + 1 < siblingStart) result.push(boundary + 1);

  result.push(...range(siblingStart, siblingEnd));

  if (showRightEllipsis) result.push('...');
  else if (siblingEnd < total - boundary) result.push(total - boundary);

  result.push(...endPages);

  return result;
});

const goTo = (value: number) => {
  if (value < 1 || value > props.totalPages || value === page.value) return;
  page.value = value;
};
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <Button
      variant="text"
      severity="secondary"
      :icon="backArrow"
      :size="buttonsSize"
      :disabled="page === 1"
      @click="goTo(page - 1)"
    />

    <Button
      v-for="(item, index) in items"
      :key="index"
      :size="buttonsSize"
      :label="String(item)"
      :class="{ 'pointer-none': item === '...' }"
      :severity="item === page ? 'primary' : 'secondary'"
      :variant="item === page ? undefined : 'text'"
      @click="item !== '...' && goTo(item)"
    />

    <Button
      variant="text"
      severity="secondary"
      class="back"
      :size="buttonsSize"
      :icon="backArrow"
      :disabled="page === totalPages"
      @click="goTo(page + 1)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  flex-wrap: wrap;
}

.back {
  :deep(svg) {
    transform: rotateY(180deg);
  }
}
.separator {
  min-width: 3.2rem;
  text-align: center;
  user-select: none;
}
</style>
