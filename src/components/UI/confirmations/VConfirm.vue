<script setup lang="ts">
import {IEmits, IProps} from "@/store/confirmations/types";
import {ConfirmationTypesColor} from "@/store/confirmations/models";

import {computed} from "vue";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const background = computed(() => ConfirmationTypesColor[props.type]);

</script>

<template>
  <div class="type" :style="{background}">{{type}}</div>

  <h1 class="title">{{title}}</h1>
  <h2 class="subtitle">{{subtitle}}</h2>

  <div class="buttons">
    <button @click="emit('accept')">Accept</button>
    <button v-if="type === 'default'" @click="emit('reject')">Reject</button>
  </div>
</template>

<style scoped lang="scss">
.type {
  padding: 10px;
  font-size: 15px;
}
.title, .subtitle {
  color: var(--dark-color);
  text-align: center;
}
.buttons {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 1.2rem 0;
  button {
    background: rgba(0, 0, 0, 0.4);
    &:hover {
      background: #000;
      color: #fff;
    }
  }
}
</style>
