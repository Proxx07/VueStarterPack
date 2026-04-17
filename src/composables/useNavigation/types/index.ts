import type { AppRouteNames } from '@/router/routes.ts';

export interface INavItem {
  label: string
  name: AppRouteNames
  icon?: string
  children?: INavItem[]
}
