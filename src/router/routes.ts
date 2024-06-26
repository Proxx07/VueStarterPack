import {RouteRecordRaw} from "vue-router";
import {$confirm} from "@/plugins/confirmation.ts";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/Main.vue'),
    meta: {
      layout: 'Default'
    }
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    beforeEnter: async () => {
      const res = await $confirm.default({title: "Вы действительно хотите перейти на страницу About?"})

      if (!res) {
        await $confirm.warning({title: 'Вы отказались переходить на страницу About'})
      }
      else {
        await $confirm.success({title: 'Вы сейчас перейдёте на страницу About'})
      }

      return res
    }
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/Page404.vue"),
    meta: {
      layout: 'Empty'
    }
  }
];

export default routes;
