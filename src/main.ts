import { createApp } from 'vue';
import {createPinia} from "pinia";
import App from '@/App.vue';
import '@/styles/main.scss';
import router from "@/router/router.ts";

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .mount('#app');
