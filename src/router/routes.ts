import type { RouteRecordRaw } from 'vue-router';
import type { ExtractRouteNames } from './types';

const baseRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/MainPage.vue'),
  },

  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/pages/LottieAnimation.vue'),
  },

  {
    path: '/status/:?type',
    name: 'status',
    component: () => import('@/pages/StatusPage.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/Page404.vue'),
    meta: { layout: 'Empty' },
  },

] as const satisfies readonly RouteRecordRaw[];

const devRoutes = [
  {
    path: '/example',
    name: 'example',
    meta: { layout: 'Default' },
    component: () => import('@/pages/example/index.vue'),
    children: [
      {
        path: '/example/requests',
        name: 'example-requests',
        component: () => import('@/pages/example/Requests.vue'),
      },
      {
        path: '/example/buttons',
        name: 'example-buttons',
        component: () => import('@/pages/example/Buttons.vue'),
      },
      {
        path: '/example/forms',
        name: 'example-forms',
        component: () => import('@/pages/example/Forms.vue'),
      },

      {
        path: '/example/plugins',
        name: 'example-plugins',
        component: () => import('@/pages/example/Plugins.vue'),
      },
    ],
  },
] as const satisfies readonly RouteRecordRaw[];

export type AppRouteNames =
  | ExtractRouteNames<typeof baseRoutes>
  | ExtractRouteNames<typeof devRoutes>;

export const routes: RouteRecordRaw[] = [
  ...baseRoutes,
  ...(import.meta.env.MODE === 'development' ? devRoutes : []),
];

export default routes;
