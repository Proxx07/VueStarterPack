import { createApp } from 'vue';
import {createPinia} from "pinia";
import App from '@/App.vue';
import '@/styles/main.scss';
import router from "@/router/router.ts";

const pinia = createPinia();
const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .mount('#app');
