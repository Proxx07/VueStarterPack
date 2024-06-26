<script setup lang="ts"></script>

<template>
<div class="modal">
  <div class="inner">
    <slot></slot>
  </div>
</div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1000;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner {
  background: #fff;
  border-radius: var(--radius-s);
  padding: 1rem;
  color: #000;
}
</style>
