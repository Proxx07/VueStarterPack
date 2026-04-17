import type { ToastDesignTokens } from '@primeuix/themes/types/toast';
import type { ToastPassThroughOptions } from 'primevue';

export const toastConfig = (): ToastDesignTokens => {
  return {
    root: {
      width: '30rem',
      borderRadius: '.7rem',
    },
    content: {
      padding: '1.2rem 1.2rem 1.1rem',
      gap: '.8rem',
    },
    text: {
      gap: '.8rem',
    },
    icon: {
      size: '2rem',
    },
    closeIcon: {
      size: '1.4rem',
    },
    closeButton: {
      width: '2rem',
      height: '2rem',
    },

    colorScheme: {
      light: {
        success: {
          background: 'color-mix(in srgb,var(--p-green-200),transparent 15%)',
          detailColor: '{stone.700}',
        },
        error: {
          background: 'color-mix(in srgb,var(--p-red-200),transparent 15%)',
          detailColor: '{stone.700}',
        },
        info: {
          background: 'color-mix(in srgb,var(--p-blue-200),transparent 15%)',
          detailColor: '{stone.700}',
        },
        warn: {
          background: 'color-mix(in srgb,var(--p-orange-200),transparent 15%)',
          detailColor: '{stone.700}',
        },
      },
      dark: {
        success: {
          background: 'color-mix(in srgb,var(--p-green-900),transparent 60%)',
        },
        error: {
          background: 'color-mix(in srgb,var(--p-red-900),transparent 60%)',
        },
        info: {
          background: 'color-mix(in srgb,var(--p-blue-900),transparent 60%)',
        },
        warn: {
          background: 'color-mix(in srgb,var(--p-orange-900),transparent 60%)',
        },
      },
    },
  };
};

export const toastPt = (): ToastPassThroughOptions => {
  return {
    summary: {
      class: 'font-18-b',
    },
    detail: {
      class: 'font-14-r',
    },
  };
};
