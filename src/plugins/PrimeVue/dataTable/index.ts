import type { DataTableDesignTokens } from '@primeuix/themes/types/datatable';
import type { DataTablePassThroughOptions } from 'primevue';

export const dataTableConfig = (): DataTableDesignTokens => {
  return {
    headerCell: {
      padding: '1rem',
    },
    bodyCell: {
      padding: '1rem',
    },
    colorScheme: {
      light: {
        row: {
          color: 'var(--site-text)',
          hoverColor: 'var(--site-text)',
        },
        headerCell: {
          borderColor: '{zinc.300}',
          color: 'var(--site-text)',
        },
        bodyCell: {
          borderColor: '{zinc.300}',
        },
      },
      dark: {
        row: {
          color: '{zinc.200}',
        },
        headerCell: {
          borderColor: 'var(--p-form-field-border-color)',
          color: '{zinc.200}',
        },
        bodyCell: {
          borderColor: 'var(--p-form-field-border-color)',
        },
      },
    },
  };
};

export const dataTablePt = (): DataTablePassThroughOptions => {
  return {
    table: {
      style: 'overflow: hidden; border-radius: var(--radius-m); min-width: 100%; width: auto;',
    },
    column: {
      columnTitle: {
        class: 'font-18-b',
      },
      bodyCell: {
        class: 'sssssssssssss',
      },
    },
  };
};
