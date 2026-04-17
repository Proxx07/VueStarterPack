import { vMaska } from 'maska/vue';
import { createPinia } from 'pinia';
import { Tooltip } from 'primevue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import Vue3Lottie from 'vue3-lottie';
import App from '@/App.vue';
import { i18n } from '@/plugins/i18n';
import { options } from '@/plugins/PrimeVue';
import router from '@/router/router.ts';
import '@/styles/main.scss';

const app = createApp(App);

const pinia = createPinia();

app
  .use(i18n)
  .use(pinia)
  .use(router)
  .use(PrimeVue, options)
  .use(ToastService)
  .use(Vue3Lottie)
  .directive('maska', vMaska)
  .directive('tooltip', Tooltip)
  .mount('#app');
