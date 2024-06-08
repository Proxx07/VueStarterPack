import {RouteRecordRaw} from "vue-router";

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