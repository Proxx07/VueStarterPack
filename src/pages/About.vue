<script setup lang="ts">
import {$confirm} from "@/plugins/confirmation.ts";
import {ref} from "vue";

const resDefault = ref();

const openDefault = async () => {
  const title = 'Ожидание подтверждения действия'
  const subtitle = 'Доп текст'
  resDefault.value = await $confirm.default({title, subtitle})
}

const openSuccess = async () => {
  const title = 'Что-то произошло успешно'
  await $confirm.success({title})
  console.log('Модалка success закрыта, продолжение выполнения скрипта')
}

const openInfo = async () => {
  const title = 'Какая-то информация'
  await $confirm.info({title})
  console.log('Модалка info закрыта, продолжение выполнения скрипта')
}

const openWarning = async () => {
  const title = 'Предупреждение'
  await $confirm.warning({title})
  console.log('Модалка warning закрыта, продолжение выполнения скрипта')
}

const openError = async () => {
  const title = 'Какая-то ошибка'
  await $confirm.error({title})
  console.log('Модалка info закрыта, продолжение выполнения скрипта')
}


</script>

<template>
  <h1>Confirmations test</h1>
  <div class="buttons">

    <button @click="openDefault">
      Default {{resDefault}}
    </button>

    <button @click="openSuccess">
      Success
    </button>

    <button @click="openInfo">
      Info
    </button>

    <button @click="openWarning">
      Warning
    </button>

    <button @click="openError">
      Error
    </button>

  </div>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin: 2rem;
}

.buttons {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  display: block;
  max-width: 20rem;
}
</style>
