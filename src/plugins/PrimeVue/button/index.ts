import type { ButtonDesignTokens } from '@primeuix/themes/types/button';
import type { ButtonPassThroughOptions, ButtonProps } from 'primevue/button';
import type { RendererElement, RendererNode, VNode } from 'vue';

export const buttonConfig = (): ButtonDesignTokens => {
  return {
    root: {
      gap: '.8rem',
      paddingX: 'calc({formField.paddingX} + .4rem)',
      paddingY: '{formField.paddingY}',
      sm: { paddingX: '{formField.sm.paddingX}', paddingY: '{formField.sm.paddingY}', fontSize: 'inherit' },
      lg: { paddingX: '{formField.lg.paddingX}', paddingY: '{formField.lg.paddingX}', fontSize: 'inherit' },
      label: { fontWeight: 'unset' },
      primary: {
        background: 'var(--primary-500)',
        hoverBackground: 'var(--primary-400)',
        activeBackground: 'var(--primary-600)',
        color: 'var(--primary-surface-color)',
        hoverColor: 'var(--primary-surface-color)',
        activeColor: 'var(--primary-surface-color)',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        activeBorderColor: 'transparent',
      },

      secondary: {
        color: 'var(--secondary-surface-color)',
        hoverColor: 'var(--secondary-surface-color)',
        activeColor: 'var(--secondary-surface-color)',
        background: 'var(--secondary-500)',
        hoverBackground: 'var(--secondary-600)',
        activeBackground: 'var(--secondary-700)',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        activeBorderColor: 'transparent',
      },
    },
    text: {
      secondary: {
        color: 'var(--text-color)',
        hoverBackground: 'color-mix(in srgb,currentColor,transparent 95%)',
        activeBackground: 'color-mix(in srgb,currentColor,transparent 90%)',
      },
    },
  };
};

export const buttonPt = (instance: VNode<RendererNode, RendererElement, ButtonProps>): ButtonPassThroughOptions => {
  return {
    root: {
      class: !instance.props?.size ? 'font-14-b' : instance.props.size === 'small' ? 'font-12-r' : 'font-16-b',
    },

    icon: {
      ...((instance.props?.icon && instance.props?.icon.includes('<svg')) && {
        innerHTML: instance.props?.icon,
        classList: `p-button-icon-svg p-button-icon-${instance.props?.iconPos || 'left'} ${instance.props?.iconClass || ''}`,
        // @ts-expect-error next-line
        style: { color: instance.attrs['icon-color'] || 'currentColor' },
      }),
      ...((instance.props?.icon && !instance.props?.icon.includes('<svg')) && { class: instance.props?.icon }),
    },
  };
};
