<script setup lang="ts">
import type { DialogProps, DialogSlots } from 'primevue/dialog';
import { useMediaQuery, useSwipe } from '@vueuse/core';
import { Dialog } from 'primevue';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<DialogProps>(), {
  showHeader: true,
  closable: true,
  modal: true,
  draggable: false,
});

defineSlots<DialogSlots>();

const closeBtnProps = {
  severity: 'error',
  size: 'small',
  variant: 'text',
};

const isVisible = defineModel('visible', { default: false });

const filteredProps = computed(() => {
  const {
    visible: vis, closable: clos, position: pos, showHeader: shead,
    ...rest
  } = props;
  return Object.fromEntries(Object.entries(rest).filter(([_, value]) => value !== undefined));
});

const isMobile = useMediaQuery('(max-width: 600px)');
const dialogPosition = computed(() => (isMobile.value ? 'bottom' : props.position));
const isClosable = computed(() => (isMobile.value ? false : props.closable));
const isHeaderHidden = computed(() => isMobile.value ? true : props.showHeader);

const swipeTarget = ref<Element>();
const lengthY = ref<number>(0);

const { isSwiping, lengthY: deltaY } = useSwipe(swipeTarget, {
  threshold: 50,
  onSwipe() {
    if (deltaY.value > 0) {
      lengthY.value = 0;
    }
    else {
      lengthY.value = -deltaY.value;
    }
  },
  onSwipeEnd() {
    if (lengthY.value > 140) {
      isVisible.value = false;
    }
    else {
      lengthY.value = 0;
    }
  },
});
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    v-bind="filteredProps"
    :close-on-escape="props.closable"
    :close-button-props="closeBtnProps"
    :closable="isClosable"
    :show-header="isHeaderHidden"
    :position="dialogPosition"
    :pt="{
      root: {
        tabindex: '0',
        style: `transform: translateY(${isSwiping ? lengthY : 0}px)`,
        class: (!isSwiping) && 'transition',
      },
      transition: isMobile ? {
        enterFromClass: 'mobile-slide-hidden',
        enterActiveClass: 'mobile-slide-animating',
        leaveToClass: 'mobile-slide-hidden',
        leaveActiveClass: 'mobile-slide-animating',
      } : undefined,
      pcCloseButton: {
        root: {
          class: 'pa-0',
        },
      },
    }"
    :style="isMobile ? 'margin: 0; width: 100vw;' : 'max-width: 44rem; width: 100%;'"
  >
    <!-- @vue-skip -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot
        v-if="name === 'header' ? !isMobile : true"
        :name="name" v-bind="slotProps || {}"
      />
    </template>

    <template v-if="isMobile" #header>
      <div ref="swipeTarget" class="mobile-bottom-sheet w-full">
        <span class="lines">
          <span v-for="i in 3" :key="i" :style="{ '--i': i }" />
        </span>
        <slot name="header" />
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.mobile-bottom-sheet {
  text-align: center;
  padding: 2rem 2rem 2rem;
  gap: 1.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .lines {
    display: grid;
    align-content: center;
    justify-content: center;
    gap: .2rem;
    width: 100%;
    opacity: 0.5;
    span {
      width: calc(1.6rem * var(--i));
      height: 2px;
      background: #fff;
      margin: 0 auto;
    }
  }
}
</style>
