import type { TabsDesignTokens } from '@primeuix/themes/types/tabs';

export const tabsConfig = (): TabsDesignTokens => {
  return {
    tablist: {
      background: 'transparent',
      borderWidth: '0',
    },

    colorScheme: {
      light: {
        tab: {
          color: '{stone.500}',
          hoverColor: 'var(--text-color)',
          borderColor: 'currentColor',
          hoverBorderColor: 'currentColor',
          activeBorderColor: 'currentColor',
        },
      },
      dark: {
        tab: {
          color: '{stone.300}',
          hoverColor: 'var(--text-color)',
          borderColor: 'currentColor',
          hoverBorderColor: 'currentColor',
          activeBorderColor: 'currentColor',
        },
      },
    },
  };
};
