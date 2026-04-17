import type { ToggleSwitchDesignTokens } from '@primeuix/themes/types/toggleswitch';

export const toggleSwitchConfig = (): ToggleSwitchDesignTokens => {
  return {
    root: {
      width: '4.2rem',
      height: '2.4rem',
      gap: '.5rem',
      borderWidth: '0',
    },
    handle: {
      size: '1.6rem',
    },

    colorScheme: {
      light: {
        root: {
          background: 'rgba(226, 234, 242, 1)',
          hoverBackground: 'rgba(226, 234, 242, 1)',
          checkedBackground: '{green.500}',
          checkedHoverBackground: '{green.600}',
          shadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.15)',
        },
        handle: {
          background: '{surface.100}',
          hoverBackground: '{surface.100}',
          checkedBackground: '{surface.100}',
          checkedHoverBackground: '{surface.100}',
        },
      },
      dark: {
        root: {
          background: '{surface.500}',
          checkedBackground: '{green.600}',
          checkedHoverBackground: '{green.500}',
          shadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.5)',
        },
        handle: {
          background: '{surface.100}',
          hoverBackground: '{surface.100}',
          checkedBackground: '{surface.100}',
          checkedHoverBackground: '{surface.100}',
        },
      },
    },
  };
};
