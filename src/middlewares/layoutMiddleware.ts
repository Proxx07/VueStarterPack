import type { RouteLocationNormalized } from 'vue-router';

export const layoutMiddleware = async (route: RouteLocationNormalized) => {
  try {
    let layout = 'Default';
    for (let i = route.matched.length - 1; i >= 0; i--) {
      const record = route.matched[i];
      if (record.meta && record.meta.layout) {
        layout = record.meta.layout as string;
        break;
      }
    }
    const layoutComponent = await import(`../layouts/${layout}.vue`);
    route.meta.layoutComponent = layoutComponent.default;
  }
  catch (error) {
    if (error) {
      const layout = 'Default';
      const layoutComponent = await import(`../layouts/${layout}.vue`);
      route.meta.layoutComponent = layoutComponent.default;
    }
  }
};
