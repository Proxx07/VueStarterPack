import type { TooltipDesignTokens } from '@primeuix/themes/types/tooltip';

export const tooltipConfig = (): TooltipDesignTokens => {
  return {
    root: {
      maxWidth: '40rem',
      shadow: 'none',
      borderRadius: '8px',
    },
    colorScheme: {
      light: {
        root: {
          background: '{gray.300}',
          color: 'var(--site-text)',
        },
      },
      dark: {
        root: {
          background: '{gray.900}',
          color: 'var(--site-text)',
        },
      },
    },
  };
};
