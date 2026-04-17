import type { FloatLabelDesignTokens } from '@primeuix/themes/types/floatlabel';

export const floatLabelConfig = (): FloatLabelDesignTokens => {
  return {
    root: {
      active: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
      },
    },
    colorScheme: {
      light: {
        root: {
          activeColor: 'var(--text-color)',
        },
      },
      dark: {
        root: {
          activeColor: 'var(--text-color)',
        },
      },
    },
  };
};

/*
export const floatLabelPt = (): FloatLabelPassThroughOptions => {
  return {

  };
};
*/
