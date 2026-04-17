<script lang="ts">
import type { InputTextProps } from 'primevue';
import type { PropType } from 'vue';
import { vMaska } from 'maska/vue';
import { InputText } from 'primevue';
import { computed, defineComponent, h, withDirectives } from 'vue';
import { useMask } from '@/composables/UI';

export default defineComponent<InputTextProps & { mask: string, unmasked?: string }> ({
  name: 'VInputMask',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: false,
    },
    unmasked: {
      type: String as PropType<string>,
      required: false,
    },
    mask: {
      type: String as PropType<string>,
      required: true,
    },
  },

  emits: ['update:modelValue', 'update:unmasked'],

  setup(props, { emit, attrs }) {
    const { maskedValue, unmaskedValue, maskModel } = useMask(props.mask);

    const value = computed({
      get() {
        return props.modelValue ?? maskedValue.value;
      },
      set(val: string) {
        maskedValue.value = val;
        emit('update:modelValue', maskedValue.value);
        if (props.unmasked !== undefined) {
          emit('update:unmasked', unmaskedValue.value);
        }
      },
    });

    return () => withDirectives(h(InputText, {
      ...attrs,
      'modelValue': value.value,
      'onUpdate:modelValue': (str: string) => {
        value.value = str;
      },
    }), [[vMaska, maskModel]]);
  },
});
</script>
