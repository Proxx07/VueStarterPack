import type { StatusTypes } from './types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useThemeMode } from '@/composables/UI';
import { statusColors, statusIcons } from './models';

export const useStatusPage = () => {
  const $router = useRouter();
  const { t } = useI18n();
  const { modeModel } = useThemeMode();

  const pageType = ($router.currentRoute.value.params?.type || 'approved') as StatusTypes;

  const pageTitle = t(`statuses.${pageType}.title`);
  const pageDescription = t(`statuses.${pageType}.description`);
  const pageIcon = statusIcons[pageType];
  const pageIconBg = computed(() => statusColors[pageType][modeModel.value]);

  return { pageTitle, pageDescription, pageIcon, pageIconBg, pageType };
};
