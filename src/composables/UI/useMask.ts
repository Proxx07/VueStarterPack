import type { MaskaDetail, MaskInputOptions } from 'maska';
import { ref } from 'vue';

export const useMask = (maskRegex: string) => {
  const maskedValue = ref<string>('');
  const unmaskedValue = ref<string>('');
  const isMaskFieldCorrect = ref(true);

  const maskModel: MaskInputOptions = {
    mask: maskRegex,
    eager: true,
    tokens: {
      A: {
        pattern: /[A-Z]/,
        transform: (chr: string) => chr.toUpperCase(),
      },
    },
    onMaska(detail: MaskaDetail) {
      unmaskedValue.value = detail.unmasked;
      isMaskFieldCorrect.value = detail.completed;
    },
  };

  return {
    maskModel,
    maskedValue,
    unmaskedValue,
  };
};
