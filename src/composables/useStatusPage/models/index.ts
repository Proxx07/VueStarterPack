import type { StatusTypes } from '../types';
import type { ThemeMode } from '@/composables/UI';
import rejected from '@/assets/icons/status/error.svg?raw';
import approved from '@/assets/icons/status/success.svg?raw';

export const statusIcons: Record<StatusTypes, string> = { approved, rejected, close: rejected };
export const statusColors: Record<StatusTypes, Record<ThemeMode, string>> = {
  approved: {
    light: 'var(--p-green-500)',
    dark: 'var(--p-green-700)',
  },
  rejected: {
    light: 'var(--p-red-500)',
    dark: 'var(--p-red-700)',
  },
  close: {
    light: 'var(--p-red-500)',
    dark: 'var(--p-red-700)',
  },
};
