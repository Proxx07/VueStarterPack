import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/main.scss';
import router from "@/router/router.ts";

const app = createApp(App);

app
  .use(router)
  .mount('#app');
