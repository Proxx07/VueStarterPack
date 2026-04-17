import type { ToastMessageOptions } from 'primevue/toast';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { i18n } from '@/plugins/i18n';

type ToastsSeverity = Exclude<ToastMessageOptions['severity'], undefined>;

export const useToastStore = defineStore('toast', () => {
  const toast = useToast();
  // const life = 5000;

  const defaultTitles: Partial<Record<ToastsSeverity, string>> = {
    success: 'toast.success',
    error: 'toast.error',
    warn: 'toast.warn',
    info: 'toast.info',
  };

  const removeToast = (message: ToastMessageOptions) => {
    toast.remove(message);
  };

  const fireToast = (severity: ToastsSeverity, title: string, text?: string) => {
    const summary = text ? title : i18n.global.t(defaultTitles[severity]!);
    const message = text || title;
    const detail = message;

    toast.add({ severity, summary, detail });
  };

  return {
    success: (title: string, text?: string) => fireToast('success', title, text),
    info: (title: string, text?: string) => fireToast('info', title, text),
    warning: (title: string, text?: string) => fireToast('warn', title, text),
    error: (title: string, text?: string) => fireToast('error', title, text),

    removeToast,
  };
});
