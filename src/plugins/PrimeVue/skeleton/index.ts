import type { SkeletonDesignTokens } from '@primeuix/themes/types/skeleton';

export const skeletonConfig = (): SkeletonDesignTokens => {
  return {

    colorScheme: {
      light: {
        root: {
          background: '{gray.300}',
          animationBackground: '{gray.200}',
        },
      },
    },
  };
};
