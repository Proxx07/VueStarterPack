import type { RouteLocationMatched } from 'vue-router';
import type { INavItem } from '../types';

export const NavigationItems: INavItem[] = [
  {
    label: 'Main page',
    name: 'main',
  },
  {
    label: 'Animation',
    name: 'animation',
  },
  {
    label: 'Example page',
    name: 'example',
    children: [
      {
        label: 'Example buttons',
        name: 'example-buttons',
      },
      {
        label: 'Example requests',
        name: 'example-requests',
      },
      {
        label: 'Example forms',
        name: 'example-forms',
      },
      {
        label: 'Example plugins',
        name: 'example-plugins',
      },
    ],
  },
  {
    label: 'Status page',
    name: 'status',
  },
];

export const collectMatchedRoutesEnum = (matchedRoutes: RouteLocationMatched[]): Record<string, string> => {
  return matchedRoutes.filter(record => typeof record.name === 'string')
    .reduce((acc, record) => {
      if (typeof record.name === 'string') {
        acc[record.name] = record.name;
      }
      return acc;
    }, {} as Record<string, string>);
};
