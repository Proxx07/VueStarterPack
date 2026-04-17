<script setup lang="ts">
import { Button } from 'primevue';
import { computed, ref } from 'vue';
import $axios from '@/api';

const list = ref([]);
const loading = ref(false);
const isError = ref(false);

const getPosts = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { data, error } = await $axios.get('/posts', { loading });
  list.value = error ? [] : data;
  isError.value = Boolean(error);
};

const buttonText = computed(() => loading.value ? 'Loading...' : 'Make test request');
</script>

<template>
  <div class="wrapper">
    <h2>Request example</h2>
    <pre>
{{ `const result = ref();
const loading = ref(false);
const isError = ref(false);

const postSomething = async (body) => {
  const { data, error } = await $axios.post('/posts', body, { loading });
  result.value = !error ? data : undefined;
  isError.value = Boolean(error);
  console.log(list.value);
};`
}}
</pre>
    <Button :label="buttonText" size="large" :loading="loading" fluid @click="getPosts" />
    <br>
    <br>
    {{ list }}
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin-bottom: 2rem;
}
pre {
  background: var(--black);
  color: var(--white);
  padding: 4rem;
  border-radius: var(--radius-l);
  font-size: 16px;
  margin-bottom: 2rem;
}
</style>
